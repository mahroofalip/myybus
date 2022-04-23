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
      "INSERT INTO owners(owner_name, owner_email,owner_password,blocked,mobile,company) values($1,$2,$3,$4,$5,$6) RETURNING *",
      [req.body.Name, req.body.Email, hashedPassword, false, req.body.mobileNumber, req.body.company]
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

      return res.json({ user: token });
    }
  } else {
    return res.json({ user: false });
  }
});

//admin add bus
app.post("/admin/addbus", async (req, res) => {

  req.body.depTime = new Date(req.body.depTime)
  req.body.arrivTime = new Date(req.body.arrivTime)
  console.log(req.body);





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
  res.json({ status: true })


});


app.post("/admin/getbuses", async (req, res) => {
  console.log("get bus fn called", req.body);
  let result = await db.get("select * from busdetails WHERE owner_id = $1", [req.body.ownerId])

  console.log(result.rows);
  if (result.rows) {

    res.json({ result: result.rows })
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
  bus.rows[0].departuretime = moment(bus.rows[0].departuretime).format('lll')
  bus.rows[0].arraivaltime = moment(bus.rows[0].arraivaltime).format('lll')
  if (bus.rows[0]) {
    return res.json({ bus: bus.rows[0] })
  } else {
    console.log('no bus for this id');
  }


})



app.put('/admin/editsubmit', async (req, res) => {

  console.log('for edt put               :', req.body);
  console.log(req.body.permit.length);
  console.log(req.body.image1.length);
  console.log(req.body.image2.length);
  console.log(req.body.image3.length);
  console.log(req.body.image4.length);

  req.body.depTime = new Date(req.body.depTime)
  req.body.arrivTime = new Date(req.body.arrivTime)

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

    return res.json({ status: true })
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
      req.body.busType,  //permit,image1,image2,image3,image4
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
      req.body.busType,  //permit,image1,image2,image3,image4
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
      req.body.busType,  //permit,image1,image2,image3,image4
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

  res.json({ status: true })

})








app.post("/user/otp/request", async (req, res) => {
  console.log('//////////');
  let exitst = await db.get('SELECT * FROM users WHERE email = $1', [req.body.Email])

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
  console.log("i am called verify");

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
          "INSERT INTO users(name,email,password,mobile) values($1,$2,$3,$4) RETURNING *",
          [
            USERDATA.Name,
            USERDATA.Email,
            hashedUserPassword,
            USERDATA.mobileNumber,
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
  console.log(user.rows[0]);

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
          "INSERT INTO users(name,email,password,mobile) values($1,$2,$3,$4) RETURNING *",
          [
            newUserName,
            newUserEmail,
            hashedUserPassword,
            "not updated",
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





app.post('/user/bus/search', async (req, res) => {

  console.log('search fn called');

  console.log(req.body);

  let { date, to, from } = req.body

  console.log(date, to, from);
  date = new Date(date)
  date = moment(date).format('L')


  let allbuses = await db.get("select * from busdetails")

  let result = allbuses.rows
  console.log(result, '*******************');

  for (x of result) {
    x.days = x.arraivaltime - x.departuretime


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
    
     x.days = Math.floor(x.days / 60000);
     x.days=moment.duration(x.days, "minutes").format("d [days],h [hrs], m [min]");
  }
 
  console.log(buses, ' this is result ==============');
        
       


  if (buses[0]) {
    res.json({ result: buses, status: true })
  } else {
    res.json({ status: false })
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




  // let result = await db.get(`SELECT * 
  // FROM "owners" 
  // JOIN "busdetails" ON "owners"."owner_id" = "busdetails"."owner_id"`)

  res.json({ result: owner })

})




app.post('/super/admin/viewbuses', async (req, res) => {
  console.log('[[[[[[[[[[[[[[4444]]]]]]]]]]]]]]]]]', req.body);
  let result = await db.get('select * from busdetails  WHERE owner_id = $1', [req.body.ownerId])
  res.json({ buses: result.rows })

})







