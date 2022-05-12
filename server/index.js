const express = require("express");
const app = express();
var morgan = require("morgan");
app.use(morgan("combined"));
const cors = require("cors");
const db = require("./db/connection");
require("dotenv").config();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const moment = require('moment')
var momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");
const { response } = require("express");
const { json } = require("body-parser");
const cloudinary = require("cloudinary").v2;
const { OAuth2Client } = require("google-auth-library")
const clientgoogle = new OAuth2Client("308398325326-d8vr61d3g6v4drv1r91hj5j13locln01.apps.googleusercontent.com")
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const uuid = require("uuid").v4;
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const SERVICE_ID = process.env.SERVICE_ID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const client = require("twilio")(ACCOUNT_SID, AUTH_TOKEN);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.listen(3001, () => {
  console.log("server running  port 3001");

});


let verifyBlock = async (req, res, next) => {

  let user = await db.get(
    `select * from owners where "owner_id" ='${req.body.owner_id}'`
  );

  console.log(user.rows, "llll");
  if (user.rows[0].blocked) {
    console.log('USER IS BLOCKED');
    res.json({ block: true })
  } else {

    next()
  }

}



// Admin signup
app.post("/admin/signup", async function (req, res) {
  let hashedPassword = await bcrypt.hash(req.body.Password, 10);

  let user = await db.get(
    `select * from owners where "owner_email" ='${req.body.Email}'`
  );

  if (user.rows[0]) {
    return res.json({ user: false });
  } else {
    const newUser = await db.get(
      "INSERT INTO owners(owner_name, owner_email,owner_password,blocked,mobile,company,status,birthday,gender,matrialstatus,image1) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
      [req.body.Name, req.body.Email, hashedPassword, false, req.body.mobileNumber, req.body.company, "admin", "not updated", "not updated", "not updated", "not updated"]
    );

    const { owner_name, owner_email, owner_id } = newUser.rows[0];

    var token = jwt.sign(
      {
        id: owner_id,
        name: owner_name,
        email: owner_email,
      },
      "secret123"
    );

    return res.json({ user: token });
  }
});

// admin Login
app.post("/admin/Login", async (req, res) => {
  let user = await db.get(
    `select * from owners where "owner_email" ='${req.body.Email}'`
  );




  if (user.rows[0]) {

    if (user.rows[0].blocked) {
      console.log('USER IS BLOCKED');
      res.json({ status: true, block: true, user: true })
    } else {

      const validPassword = await bcrypt.compare(
        req.body.Password,
        user.rows[0].owner_password
      );

      if (!validPassword) {
        return res.json({ user: 0 });
      } else {
        const { owner_name, owner_email, owner_id } = user.rows[0];

        var token = jwt.sign(
          {
            id: owner_id,
            name: owner_name,
            email: owner_email,
          },
          "secret123"
        );

        return res.json({ block: false, user: token });
      }

    }

  } else {
    return res.json({ user: false });
  }
});

//admin add bus

app.post("/admin/addbus", verifyBlock, async (req, res) => {

  req.body.depTime = moment(req.body.depTime).format();

  req.body.arrivTime = moment(req.body.arrivTime).format();
 
  const permit = {
    image: req.body.permit,
  };
  const image1 = {
    image: req.body.image1,
  };
  const image2 = {
    image: req.body.image2,
  };
  const image3 = {
    image: req.body.image3,
  };
  const image4 = {
    image: req.body.image4,
  };

  let permit_link = await cloudinary.uploader.upload(permit.image, {
    folder: "mybus",
  });
  let image1_link = await cloudinary.uploader.upload(image1.image, {
    folder: "mybus",
  });
  let image2_link = await cloudinary.uploader.upload(image2.image, {
    folder: "mybus",
  });
  let image3_link = await cloudinary.uploader.upload(image3.image, {
    folder: "mybus",
  });

  let image4_link = await cloudinary.uploader.upload(image4.image, {
    folder: "mybus",
  });

  const newbus = await db.get(
    "INSERT INTO busdetails(owner_id,busname,registernumber,bustype,seats,fromstart,toend,prize,departuretime,arraivaltime,permit,image1,image2,image3,image4) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *",
    [
      req.body.owner_id,
      req.body.busname,
      req.body.registerNUmber,
      req.body.busType,
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.prize,
      req.body.depTime,
      req.body.arrivTime,
      permit_link.secure_url,
      image1_link.secure_url,
      image2_link.secure_url,
      image3_link.secure_url,
      image4_link.secure_url
    ]
  );
  console.log(newbus.rows[0], "this is the new bus");
  res.json({ status: true, block: false })


});


app.post("/admin/getbuses", verifyBlock, async (req, res) => {

  let result = await db.get("select * from busdetails WHERE owner_id = $1", [req.body.owner_id])
  console.log("ADMIN NOT BLOCKED", result.rows);
  if (result.rows) {
    res.json({ block: false, result: result.rows })
  } else {
    console.log('no buses in db');
  }

})

// admin edit bus
app.post('/admin/editbus', async (req, res) => {

  let bus = await db.get(
    `select * from busdetails where "id" ='${req.body.busId}'`
  );
  console.log(bus.rows[0]);

  if (bus.rows[0]) {
    return res.json({ bus: bus.rows[0] })
  } else {
    console.log('no bus for this id');
  }

})



app.put('/admin/editsubmit', async (req, res) => {



  req.body.depTime = moment(req.body.depTime).format();

  req.body.arrivTime = moment(req.body.arrivTime).format();

  // if not image for update
  if (req.body.permit.length < 100 && req.body.image1.length < 100 && req.body.image2.length < 100 && req.body.image3.length < 100 && req.body.image4.length < 100) {

    const newbus = await db.get(`UPDATE busdetails SET busname = $1,registernumber = $2, bustype = $3 ,seats=$4,fromstart=$5, toend=$6, prize=$7,  departuretime=$8,  arraivaltime=$9 WHERE id = $10 RETURNING *`,

      [req.body.busname,
      req.body.registerNUmber,
      req.body.busType,
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.prize,
      req.body.depTime,
      req.body.arrivTime,
      req.body.id])

    return res.json({ status: true, block: false })
  }
  // if permit image for update
  if (req.body.permit.length > 100) {

    const permit = {
      image: req.body.permit,
    };

    let permit_link = await cloudinary.uploader.upload(permit.image, {
      folder: "mybus",
    });

    const newbus = await db.get('UPDATE busdetails SET busname = $1,registernumber = $2, bustype = $3 ,seats=$4,fromstart=$5, toend=$6, prize=$7,  departuretime=$8,  arraivaltime=$9,permit=$10  WHERE id = $11 RETURNING *',
      [req.body.busname,
      req.body.registerNUmber,
      req.body.busType,
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.prize,

      req.body.depTime,

      req.body.arrivTime,
      permit_link.secure_url,
      req.body.id])

  } else {

    const newbus = await db.get('UPDATE busdetails SET busname = $1,registernumber = $2, bustype = $3 ,seats=$4,fromstart=$5, toend=$6, prize=$7,  departuretime=$8,  arraivaltime=$9 WHERE id = $10 RETURNING *',
      [req.body.busname,
      req.body.registerNUmber,
      req.body.busType,
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.prize,

      req.body.depTime,

      req.body.arrivTime,
      req.body.id])

  }

  // if image1 for update
  if (req.body.image1.length > 100) {

    const permit = {
      image: req.body.image1,
    };

    let link = await cloudinary.uploader.upload(permit.image, {
      folder: "mybus",
    });

    const newbus = await db.get('UPDATE busdetails SET busname = $1,registernumber = $2, bustype = $3 ,seats=$4,fromstart=$5, toend=$6, prize=$7,  departuretime=$8,  arraivaltime=$9,image1=$10  WHERE id = $11 RETURNING *',
      [req.body.busname,
      req.body.registerNUmber,
      req.body.busType,
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.prize,

      req.body.depTime,

      req.body.arrivTime,
      link.secure_url,
      req.body.id])

  } else {

    const newbus = await db.get('UPDATE busdetails SET busname = $1,registernumber = $2, bustype = $3 ,seats=$4,fromstart=$5, toend=$6, prize=$7,  departuretime=$8,  arraivaltime=$9 WHERE id = $10 RETURNING *',
      [req.body.busname,
      req.body.registerNUmber,
      req.body.busType,
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.prize,

      req.body.depTime,

      req.body.arrivTime,
      req.body.id])

  }
  // if image 2

  if (req.body.image2.length > 100) {

    const permit = {
      image: req.body.image2,
    };

    let link = await cloudinary.uploader.upload(permit.image, {
      folder: "mybus",
    });

    const newbus = await db.get('UPDATE busdetails SET busname = $1,registernumber = $2, bustype = $3 ,seats=$4,fromstart=$5, toend=$6, prize=$7,  departuretime=$8,  arraivaltime=$9 ,image2=$10  WHERE id = $11 RETURNING *',
      [req.body.busname,
      req.body.registerNUmber,
      req.body.busType,
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.prize,

      req.body.depTime,

      req.body.arrivTime,
      link.secure_url,
      req.body.id])

  } else {

    const newbus = await db.get('UPDATE busdetails SET busname = $1,registernumber = $2, bustype = $3 ,seats=$4,fromstart=$5, toend=$6, prize=$7,  departuretime=$8,  arraivaltime=$9 WHERE id = $10 RETURNING *',
      [req.body.busname,
      req.body.registerNUmber,
      req.body.busType,
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.prize,

      req.body.depTime,

      req.body.arrivTime,
      req.body.id])

  }
  //if  image3
  if (req.body.image3.length > 100) {

    const permit = {
      image: req.body.image3,
    };

    let link = await cloudinary.uploader.upload(permit.image, {
      folder: "mybus",
    });

    const newbus = await db.get('UPDATE busdetails SET busname = $1,registernumber = $2, bustype = $3 ,seats=$4,fromstart=$5, toend=$6, prize=$7,  departuretime=$8,  arraivaltime=$9 ,image3=$10  WHERE id = $11 RETURNING *',
      [req.body.busname,
      req.body.registerNUmber,
      req.body.busType,
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.prize,

      req.body.depTime,

      req.body.arrivTime,
      link.secure_url,
      req.body.id])

  } else {

    const newbus = await db.get('UPDATE busdetails SET busname = $1,registernumber = $2, bustype = $3 ,seats=$4,fromstart=$5, toend=$6, prize=$7,  departuretime=$8,  arraivaltime=$9 WHERE id = $10 RETURNING *',
      [
        req.body.busname,
        req.body.registerNUmber,
        req.body.busType,
        req.body.seats,
        req.body.from,
        req.body.to,
        req.body.prize,
        req.body.depTime,
        req.body.arrivTime,
        req.body.id])

  }

  //if image4
  if (req.body.image4.length > 100) {

    const permit = {
      image: req.body.image4,
    };

    let link = await cloudinary.uploader.upload(permit.image, {
      folder: "mybus",
    });

    const newbus = await db.get('UPDATE busdetails SET busname = $1,registernumber = $2, bustype = $3 ,seats=$4,fromstart=$5, toend=$6, prize=$7,  departuretime=$8,  arraivaltime=$9,image4=$10  WHERE id = $11 RETURNING *',
      [req.body.busname,
      req.body.registerNUmber,
      req.body.busType,
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.prize,

      req.body.depTime,

      req.body.arrivTime,
      link.secure_url,
      req.body.id])

  } else {

    const newbus = await db.get('UPDATE busdetails SET busname = $1,registernumber = $2, bustype = $3 ,seats=$4,fromstart=$5, toend=$6, prize=$7,  departuretime=$8,  arraivaltime=$9 WHERE id = $10 RETURNING *',
      [req.body.busname,
      req.body.registerNUmber,
      req.body.busType,
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.prize,

      req.body.depTime,

      req.body.arrivTime,
      req.body.id])

  }


  return res.json({ status: true })



})

// deleter bus

app.delete('/admin/deletebus/:id', (req, res) => {
  console.log('THISIS DELETE FUNCTION ', req.params.id);

  db.get('DELETE FROM busdetails WHERE id = $1', [req.params.id])

  res.json({ status: true, block: false })

})




app.post('/admin/tripdetails', async (req, res) => {
  console.log("THIS IS TRIP DETAILS   :", req.body);

  let trip = await db.get('SELECT DISTINCT ON (depdate) * FROM tripdetails WHERE bus_id = $1 order by depdate', [req.body.busId])

  let { rows } = await db.get('SELECT * FROM passangers')
  booked = []
  trip.rows.map((dt, index) => {

    var count = 0
    rows.map((pd) => {


      if (dt.bus_id == pd.bus_id && dt.depdate === pd.trip_date) {
        count++
      }

    })
    trip.rows[index].booked = count
    trip.rows[index].id = index + 1
    return
  })

  res.json({ result: trip.rows })

})


app.put('/admin/statusChangeToUpcoming', async (req, res) => {

  const { busId, depdate } = req.body

  const newbus = await db.get(`update tripdetails set tripStataus='Upcoming' where bus_id=${busId} AND depdate='${depdate}' RETURNING *`)

  res.json({ result: newbus.rows[0] })
})


app.put('/admin/statusChangeToCompleted', async (req, res) => {

  const { busId, depdate } = req.body

  const newbus = await db.get(`update tripdetails set tripStataus='Completed', status=2 where bus_id=${busId} AND depdate='${depdate}' RETURNING *`)
  db.get(`update passangers set  status=2 where bus_id=${busId} AND trip_date='${depdate}'`)
  res.json({ result: newbus.rows[0] })


})


app.post('/admin/View/Passangers', async (req, res) => {

  const { busId, date } = req.body

  const { rows } = await db.get(`select * from passangers where bus_id=${busId} AND trip_date='${date}'`)

  let result = await rows.map((row, index) => {
    row.NO = index + 1
    return row
  })
  console.log(result);

  res.json({ result: result, date })

})



app.post('/admin/report', async (req, res) => {

  console.log("THIS IS ADMIN REPORT", req.body)

  const { ownerId } = req.body

  const { rows } = await db.get(`select DISTINCT ON (depdate) * from tripdetails where owner_id=${ownerId} `)

  let passangers = await db.get('SELECT * FROM passangers where status=1')

  if (passangers.rows[0]) {


    rows.map((dt, index) => {

      var count = 0

      passangers.rows.map((pd) => {


        if (dt.bus_id == pd.bus_id && dt.depdate === pd.trip_date) {

          count++

        }

      })
      rows[index].bookings = count
      rows[index].id = index + 1
      rows[index].totalErnings = rows[index].bookings * rows[index].total
      rows[index].expense = (rows[index].totalErnings / 100) * 10
      rows[index].profit = rows[index].totalErnings - rows[index].expense

      return
    })






    res.json({ rows })


  }



})



app.post("/user/otp/request", async (req, res) => {

  let exitst = await db.get('SELECT DISTINCT * FROM users WHERE email = $1', [req.body.Email])

  if (exitst.rows[0]) {
    console.log("user exist ", exitst.rows[0]);
    return res.json({ status: "exist" })
  } else {
    console.log("user not exist ", exitst.rows[0]);
    client.verify
      .services(SERVICE_ID)
      .verifications.create({
        to: `+91${req.body.mobileNumber}`,
        channel: "sms",
      })
      .then((response) => {
        return res.status(200).json({ status: response.status, user: req.body });
      })
      .catch((err) => {
        console.log(err);
        console.log("somthig wrong ...");

      });

  }

});



app.post("/user/otp/verify", (req, res) => {


  USERDATA = JSON.parse(req.body.USER);

  client.verify
    .services(SERVICE_ID)
    .verificationChecks.create({
      to: `+91${USERDATA.mobileNumber}`,
      code: req.body.OTP,
    })
    .then(async (verification) => {
      console.log(verification);
      if (verification.valid) {
        let hashedUserPassword = await bcrypt.hash(USERDATA.Password, 10);
        const newUser = await db.get(
          "INSERT INTO users(name,email,password,mobile,status,birthday,gender,matrialstatus,image1) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
          [
            USERDATA.Name,
            USERDATA.Email,
            hashedUserPassword,
            USERDATA.mobileNumber,
            "user",
            "not updated",
            "not updated",
            "not updated",
            "not updated"
          ]
        );
        console.log("FORM SUCCESSFULLY SUBMITTED");
        const id = newUser.rows[0].id
        const userName = newUser.rows[0].name;
        const userEmail = newUser.rows[0].email;

        var token = jwt.sign(
          {
            id: id,
            name: userName,
            email: userEmail,
          },
          "secret123"
        );
        return res.json({ status: true, userToken: token });
      } else {
        console.log("FORM NOT SUBMITED");
        return res.json({ status: false, Error: "Invalid otp" });
      }
    });
});

// user login


app.post('/user/Login', async (req, res) => {

  console.log(req.body);
  let user = await db.get('SELECT * FROM users WHERE email = $1', [req.body.Email])


  if (user.rows[0]) {

    const validPassword = await bcrypt.compare(
      req.body.Password,
      user.rows[0].password
    );

    if (validPassword) {

      const id = user.rows[0].id
      const userName = user.rows[0].name;
      const userEmail = user.rows[0].email;

      var token = jwt.sign(
        {
          id: id,
          name: userName,
          email: userEmail,
        },
        "secret123"
      );
      return res.json({ status: true, userToken: token });


    } else {
      res.json({ status: 0 })
    }


  } else {

    res.json({ status: false })
  }


})

app.post('/user/otp/Login', async (req, res) => {

  console.log(req.body);
  let user = await db.get('SELECT * FROM users WHERE mobile = $1', [req.body.mobileNumber])
  console.log(user.rows[0]);

  if (user.rows[0]) {

    client.verify
      .services(SERVICE_ID)
      .verifications.create({
        to: `+91${user.rows[0].mobile}`,
        channel: "sms",
      })
      .then((response) => {

        return res.status(200).json({ status: response.status, user: req.body });
      })
      .catch((err) => {
        console.log(err);
        console.log("somthig wrong ...");

      });


  } else {
    res.json({ status: false })
  }

})


app.post('/user/otp/login/verify', (req, res) => {
  console.log(req.body);

  client.verify
    .services(SERVICE_ID)
    .verificationChecks.create({
      to: `+91${req.body.MOB}`,
      code: req.body.OTP,
    })
    .then(async (verification) => {
      console.log(verification);
      if (verification.valid) {

        let user = await db.get('SELECT * FROM users WHERE mobile = $1', [req.body.MOB])

        console.log("FORM SUCCESSFULLY SUBMITTED");
        const id = user.rows[0].id
        const userName = user.rows[0].name;
        const userEmail = user.rows[0].email;

        var token = jwt.sign(
          {
            id: id,
            name: userName,
            email: userEmail,
          },
          "secret123"
        );
        return res.json({ status: true, userToken: token });
      } else {
        console.log("FORM NOT SUBMITED");
        return res.json({ status: false, Error: "Invalid otp" });
      }
    });

})




app.post('/user/google/authentication', (req, res) => {

  let idToken = req.body.token.tokenId

  clientgoogle.verifyIdToken({ idToken, audience: "308398325326-d8vr61d3g6v4drv1r91hj5j13locln01.apps.googleusercontent.com" }).then(async (response) => {

    const { email_verified, name, email } = response.payload

    console.log('name :', name, "  emailverified   :", email_verified, " email    :", email);

    if (email_verified) {
      let user = await db.get('SELECT * FROM users WHERE email = $1', [email])
      if (user.rows[0]) {
        const id = user.rows[0].id
        const userName = user.rows[0].name;
        const userEmail = user.rows[0].email;

        var token = jwt.sign(
          {
            id: id,
            name: userName,
            email: userEmail,
          },
          "secret123"
        );
        return res.json({ status: true, userToken: token });
      } else {
        let password = email + process.env.JWT_SIGNIN_KEY
        console.log('pwd   :', password);
        let newUserName = name
        let newUserEmail = email


        let hashedUserPassword = await bcrypt.hash(password, 10);
        const newUser = await db.get(
          "INSERT INTO users(name,email,password,mobile,status,birthday,gender,matrialstatus,image1) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
          [
            newUserName,
            newUserEmail,
            hashedUserPassword,
            "not updated",
            "user",
            "not updated",
            "not updated",
            "not updated",
            "not updated"
          ]
        );

        const id = newUser.rows[0].id
        const userName = newUser.rows[0].name;
        const userEmail = newUser.rows[0].email;

        var token = jwt.sign(
          {
            id: id,
            name: userName,
            email: userEmail,
          },
          "secret123"
        );
        return res.json({ status: true, userToken: token });
      }
    }
  })
})


app.post('/user/bus/getOne', async (req, res) => {

  console.log("ppppppppppppppp", req.body)
  let bus = await db.get(
    `select * from busdetails where "id" ='${req.body.id}'`
  );
  console.log(bus.rows[0]);

  if (bus.rows[0]) {
    for (x of bus.rows) {

      x.baseDpDate = x.departuretime
      x.departuretime = moment(x.departuretime).format('lll')
      x.arraivaltime = moment(x.arraivaltime).format('lll')

    }
    return res.json({ bus: bus.rows[0] })
  } else {
    console.log('no bus for this id');
  }
})

app.post('/bookedSeates', async (req, res) => {

  const { dDate, id } = req.body
  let bookingDetails = await db.get(`SELECT * FROM "tripdetails" JOIN "passangers" ON "tripdetails"."tripid" = "passangers"."trip_id"`)


  let bookedseats = await bookingDetails.rows.map((bus) => {

    if (bus.depdate == dDate && bus.bus_id == id && bus.status == 1) {
      return bus.passanger_seat
    } else {
      return 0
    }

  })

  res.json({ bookedseats })



})



app.post('/user/bus/search', async (req, res) => {

  let { date, to, from } = req.body
  date = new Date(date)
  date = moment(date).format('L')


  let allbuses = await db.get("select * from busdetails")

  let result = allbuses.rows

  for (x of result) {
    x.days = x.arraivaltime - x.departuretime

    x.dTime = moment(x.departuretime).format('lll')

    x.departuretime = moment(x.departuretime).format('L')

  }

  let filtered = await result.map((bus) => {

    if (bus.fromstart.toLowerCase() === from.toLowerCase() && bus.toend.toLowerCase() === to.toLowerCase() && bus.departuretime === date) {
      return bus
    }

  })

  let buses = []

  for (i = 0; i < filtered.length; i++) {
    let count = 0
    if (!filtered[i] == "") {
      buses.push(filtered[i])
      count++
    } else {
      console.log('filtered undifind')
    }
  }


  for (x of buses) {

    x.departuretime = moment(x.departuretime).format('lll')
    x.arraivaltime = moment(x.arraivaltime).format('lll')

    x.time = x.dTime.slice(11, 21)

    x.time = moment(x.time, 'hh:mm A').format('HH:mm')
    x.days = Math.floor(x.days / 60000);
    x.time = x.time.slice(0, 2)
    x.time = parseInt(x.time)
    x.fiveAmToTenAm = false
    x.tenAmToFivePm = false
    x.fivePmToElevenPm = false
    x.afterElevenToFiveAm = false
    if (x.time >= 5 && x.time <= 10) {
      x.fiveAmToTenAm = true
    } else {
      x.fiveAmToTenAm = false
    }
    if (x.time >= 10 && x.time <= 17) {
      x.tenAmToFivePm = true
    } else {
      x.tenAmToFivePm = false
    }
    if (x.time >= 17 && x.time <= 23) {
      x.fivePmToElevenPm = true
    } else {
      x.fivePmToElevenPm = false
    }
    if (x.time >= 23 || x.time <= 5) {
      x.afterElevenToFiveAm = true
    } else {
      x.afterElevenToFiveAm = false
    }
    x.days = moment.duration(x.days, "minutes").format("d [days],h [hrs], m [min]");
  }



  if (buses[0]) {
    console.log(buses, "pppppppppppppppppppppppppppppppppppkj");
    res.json({ result: buses, status: true })
  } else {
    res.json({ status: false })
  }

})



// stripe payment
app.post("/checkout", async (req, res) => {


  let error;
  let status;
  try {

    const { bookInfo, token } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencyKey = uuid();

    const charge = await stripe.charges.create(
      {
        amount: bookInfo.Total,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Booked the ${bookInfo.busname}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,

            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey,
      }
    );

    const newTicket = await db.get(
      "INSERT INTO tripdetails(bus_id,user_id,contact_email,contact_mobile,arrivdate,depdate,dep_place,arr_place,tripStataus,total,booking_date,owner_id,status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",
      [
        bookInfo.id,
        bookInfo.userInfo.id,
        bookInfo.userContact.email,
        bookInfo.userContact.mobile,
        bookInfo.arraivaltime,
        bookInfo.departuretime,
        bookInfo.fromstart,
        bookInfo.toend,
        "Parking",
        bookInfo.prize,
        bookInfo.baseDate,
        bookInfo.owner_id,
        1
      ]
    );

    await bookInfo.TicketsInfo.map((passanger) => {
      db.get(
        "INSERT INTO passangers(trip_id , passanger_seat , passanger_name , passanger_age,passanger_gender,bus_id,trip_date,mobile,email,owner_id,total,status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
        [
          newTicket.rows[0].tripid,
          passanger.seatNo,
          passanger.Name,
          passanger.Age,
          passanger.gender,
          bookInfo.id,
          bookInfo.departuretime,
          bookInfo.userContact.mobile,
          bookInfo.userContact.email,
          bookInfo.owner_id,
          bookInfo.prize,
          1
        ]
      );
    })

    status = "success";

  } catch (error) {

    status = "failure";

  }

  res.json({ error, status });

});

app.post('/user/managebooking', async (req, res) => {

  let bookingDetails = await db.get(`SELECT * FROM tripdetails where user_id=$1`, [req.body.id])
  let result = bookingDetails.rows
  if (result[0]) {
    console.log("THIS IS MANAGE BOOKING    :", result);
    res.json({ result })
  } else {
    res.json({ result: false })
  }
})


app.put('/bookingcancel', (req, res) => {
  console.log(req.body);
  db.get('UPDATE tripdetails SET status = $1  WHERE tripid = $2',
    [
      0,
      req.body.tripid
    ])
  db.get('UPDATE passangers SET status = $1  WHERE trip_id = $2',
    [
      0,
      req.body.tripid
    ])
  res.json({ status: true })
})

app.post('/user/profile', async (req, res) => {
  console.log("llllll    :", req.body)
  let result = await db.get('select * from users  WHERE id = $1', [req.body.id])

  let profile = result.rows[0]

  res.json({ profile })

})




app.put('/edit/profile', async (req, res) => {


  if (req.body.status === 'user') {
    // user profile edit 

    const { id, name, dob, gender, matrialstatus, image1 } = req.body
    console.log('qqqqqqqqqqqqq       :', id, name, dob, gender, matrialstatus, image1, ':     ffffffffff');

    let src
    if (image1 === "not updated") {
      src = "not updated"

    } else {
      const profileImage = {
        image: req.body.image1,
      };

      let permit_link = await cloudinary.uploader.upload(profileImage.image, {
        folder: "ProfilesMaybus",
      });

      src = permit_link.secure_url

    }

    let { rows } = await db.get('UPDATE users SET name = $1 , birthday=$2 ,gender=$3,matrialstatus=$4,image1=$5 WHERE id = $6 RETURNING *',
      [
        name,
        dob,
        gender,
        matrialstatus,
        src,
        id

      ])

    res.json({ updatedData: rows[0] })

  } else {

    console.log("this req for update admin profile");

  }
})


//super admin section

app.post('/super/admin/Login', async (req, res) => {

  let result = await db.get("select * from superadmin")
  console.log(result);
  if (!result.rows[0]) {
    console.log('new super admin')
    console.log('super user login', req.body);
    let hashedPassword = await bcrypt.hash(req.body.Password, 10);
    console.log('hashed password', hashedPassword)

    const newUser = await db.get(
      "INSERT INTO superadmin(super_admin_email,super_admin_password) values($1,$2) RETURNING *",
      [
        req.body.Email,
        hashedPassword
      ]
    );

    console.log(newUser);

    const userName = newUser.rows[0].super_admin_email;
    const userEmail = newUser.rows[0].super_admin_password;

    var token = jwt.sign(
      {
        name: userName,
        email: userEmail,
      },
      "secret123"
    );
    return res.json({ status: true, superAdminToken: token });
  } else {
    console.log('not new super admin')

    const validPassword = await bcrypt.compare(
      req.body.Password,
      result.rows[0].super_admin_password
    );

    if (!validPassword || req.body.Email != result.rows[0].super_admin_email) {
      return res.json({ superAdminToken: 0 });
    } else {
      const { super_admin_email } = result.rows[0];

      var token = jwt.sign(
        {
          email: super_admin_email,
          name: 'mahroofali',
        },
        "secret123"
      );
      return res.json({ status: true, superAdminToken: token });
    }
  }

})


app.get('/super/admin/getcompanies', async (req, res) => {

  let result = await db.get('select * from owners')
  console.log(result.rows);

  let owner = []

  owner = await result.rows.map((row) => {

    let obj = {
      id: row.owner_id,
      blocked: row.blocked,
      company: row.company,
      mobile: row.mobile,
      owner_email: row.owner_email,
      owner_name: row.owner_name,
      owner_password: row.owner_password
    }
    return obj


  })


  res.json({ result: owner })

})




app.post('/super/admin/viewbuses', async (req, res) => {

  let result = await db.get('select * from busdetails  WHERE owner_id = $1', [req.body.ownerId])
  res.json({ buses: result.rows })

})

app.get('/super/admin/getowners', async (req, res) => {

  let result = await db.get('select * from owners')

  let { rows } = result


  for (x of rows) {
    x.id = x.owner_id
  }


  res.json({ result: rows })

})



app.put('/super/admin/blockOwner', (req, res) => {


  db.get('UPDATE owners SET blocked = $1  WHERE owner_id = $2',
    [
      true,
      req.body.id
    ])



})


app.put('/super/admin/unBlockOwner', (req, res) => {

  db.get('UPDATE owners SET blocked = $1  WHERE owner_id = $2',
    [
      false,
      req.body.id
    ])

})


app.get('/super/admin/report', async (req, res) => {

  console.log("THIS IS SALES REPORT ");


  const { rows } = await db.get(`select DISTINCT ON (depdate) * from tripdetails where tripStataus='Completed'`)

  let passangers = await db.get('SELECT * FROM passangers')

  if (passangers.rows[0]) {


    rows.map((dt, index) => {

      var count = 0

      passangers.rows.map((pd) => {


        if (dt.bus_id == pd.bus_id && dt.depdate === pd.trip_date) {

          count++

        }

      })
      rows[index].bookings = count
      rows[index].id = index + 1
      rows[index].totalErnings = rows[index].bookings * rows[index].total
      rows[index].profit = (rows[index].totalErnings / 100) * 10
      rows[index].percentage = 10
      rows[index].expense = rows[index].totalErnings - rows[index].profit


      return
    })



    res.json({ rows })


  }


})

app.post('/admin/dashboard/bookings', async (req, res) => {
  const { owner_id } = req.body
  let Cancelled = await db.get(`select * from passangers where owner_id = ${owner_id} AND status=0`)
  let Upcoming = await db.get(`select * from passangers where owner_id = ${owner_id} AND status=1`)
  let Completed = await db.get(`select * from passangers where owner_id = ${owner_id} AND status=2`)
  let Total = await db.get(`select * from passangers where owner_id = $1`, [owner_id])


  let date = new Date()
  date = moment(date).format('lll')

  date = date.slice(0, 3)
 



  let cancel = Cancelled.rows.map((row) => {
    let x = row.trip_date.slice(0, 3)
    if (date === x) {
      return row
    }
  })

  let coming = Upcoming.rows.map((row) => {

    let x = row.trip_date.slice(0, 3)

    if (date === x) {
      return row
    }

  })


  let complete = Completed.rows.map((row) => {

    let x = row.trip_date.slice(0, 3)

    if (date === x) {
      return row
    }

  })


  let totalErnings = 0
  for (x of Completed.rows) {
    totalErnings = totalErnings + x.total
  }


  let cancelled = cancel.length
  let totcancel = Cancelled.rows.length
  let upcoming = coming.length
  let completed = complete.length
  let total = Total.rows.length
 
  res.json({ cancelled, upcoming, completed, total, totalErnings,totcancel })
})


app.post('/admin/dashboard/barchart',(req,res)=>{

  console.log(req.body);



})