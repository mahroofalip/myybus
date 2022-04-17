const express = require("express");
const app = express();
var morgan = require("morgan");
app.use(morgan("combined"));
const cors = require("cors");
const db = require("./db/connection");
require("dotenv").config();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");
const { response } = require("express");
const { json } = require("body-parser");
const cloudinary = require("cloudinary").v2;

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
      "INSERT INTO owners(owner_name, owner_email,owner_password) values($1,$2,$3) RETURNING *",
      [req.body.Name, req.body.Email, hashedPassword]
    );

    const userName = newUser.rows[0].owner_name;
    const userEmail = newUser.rows[0].owner_email;

    var token = jwt.sign(
      {
        name: userName,
        email: userEmail,
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
      const { owner_name, owner_email } = user.rows[0];

      var token = jwt.sign(
        {
          email: owner_name,
          name: owner_email,
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
  console.log(image1_link, 'imaaaaaaaaaaaaaaaage ');
  const newbus = await db.get(
    "INSERT INTO busdetails(busname,registernumber,bustype,seats,fromstart,toend,duration,departuredate,departuretime,arraivaldate,arraivaltime,permit,image1,image2,image3,image4) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *",
    [
      req.body.busname,
      req.body.registerNUmber,
      req.body.busType,
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.duration,
      req.body.depDate,
      req.body.depTime,
      req.body.arrivDate,
      req.body.arrivTime,
      permit_link.secure_url,
      image1_link.secure_url,
      image2_link.secure_url,
      image3_link.secure_url,
      image4_link.secure_url,
    ]
  );
  console.log(newbus.rows[0], "this is the new bus");
  res.json({ status: true })
});


app.get("/admin/getbuses", async (req, res) => {
  console.log("get bus fn called");
  let result = await db.get("select * from busdetails")
  if (result.rows) {
    console.log(result.rows);
    res.json({ result: result.rows })
  } else {
    console.log('no buses in db');
  }





})
// admin edit bus
app.post('/admin/editbus', async (req, res) => {
  console.log('///}}}}}}}}}}}}}}}}}}}}]', req.body.busId);
  let bus = await db.get(
    `select * from busdetails where "id" ='${req.body.busId}'`
  );

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


    // if not image for update
  if (req.body.permit.length < 100 && req.body.image1.length < 100 && req.body.image2.length < 100 && req.body.image3.length < 100 && req.body.image4.length < 100) {

    const newbus = await db.get('UPDATE busdetails SET busname = $1, registernumber = $2, bustype = $3 ,seats=$4, fromstart=$5, toend=$6, duration=$7, departuredate=$8 ,departuretime=$9, arraivaldate=$10 ,arraivaltime=$11 WHERE id = $12 RETURNING *',
      [req.body.busname,
      req.body.registerNUmber,
      req.body.busType,
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.duration,
      req.body.depDate,
      req.body.depTime,
      req.body.arrivDate,
      req.body.arrivTime,
      req.body.id])

     return res.json({status: true})
  }
    // if permit image for update
  if(req.body.permit.length>100){

    const permit = {
      image: req.body.permit,
    };

    let permit_link = await cloudinary.uploader.upload(permit.image, {
      folder: "mybus",
    });

    const newbus = await db.get('UPDATE busdetails SET busname = $1, registernumber = $2, bustype = $3 ,seats=$4, fromstart=$5, toend=$6, duration=$7, departuredate=$8 ,departuretime=$9, arraivaldate=$10 ,arraivaltime=$11,permit=$12  WHERE id = $13 RETURNING *',
      [req.body.busname,
      req.body.registerNUmber,
      req.body.busType,  //permit,image1,image2,image3,image4
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.duration,
      req.body.depDate,
      req.body.depTime,
      req.body.arrivDate,
      req.body.arrivTime,
      permit_link.secure_url,
      req.body.id])

  }else{

    const newbus = await db.get('UPDATE busdetails SET busname = $1, registernumber = $2, bustype = $3 ,seats=$4, fromstart=$5, toend=$6, duration=$7, departuredate=$8 ,departuretime=$9, arraivaldate=$10 ,arraivaltime=$11 WHERE id = $12 RETURNING *',
      [req.body.busname,
      req.body.registerNUmber,
      req.body.busType,
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.duration,
      req.body.depDate,
      req.body.depTime,
      req.body.arrivDate,
      req.body.arrivTime,
      req.body.id])
    
  }

   // if image1 for update
   if(req.body.image1.length>100){

    const permit = {
      image: req.body.image1,
    };

    let link = await cloudinary.uploader.upload(permit.image, {
      folder: "mybus",
    });

    const newbus = await db.get('UPDATE busdetails SET busname = $1, registernumber = $2, bustype = $3 ,seats=$4, fromstart=$5, toend=$6, duration=$7, departuredate=$8 ,departuretime=$9, arraivaldate=$10 ,arraivaltime=$11,image1=$12  WHERE id = $13 RETURNING *',
      [req.body.busname,
      req.body.registerNUmber,
      req.body.busType,  
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.duration,
      req.body.depDate,
      req.body.depTime,
      req.body.arrivDate,
      req.body.arrivTime,
      link.secure_url,
      req.body.id])

  }else{

    const newbus = await db.get('UPDATE busdetails SET busname = $1, registernumber = $2, bustype = $3 ,seats=$4, fromstart=$5, toend=$6, duration=$7, departuredate=$8 ,departuretime=$9, arraivaldate=$10 ,arraivaltime=$11 WHERE id = $12 RETURNING *',
      [req.body.busname,
      req.body.registerNUmber,
      req.body.busType,
      req.body.seats,
      req.body.from,
      req.body.to,
      req.body.duration,
      req.body.depDate,
      req.body.depTime,
      req.body.arrivDate,
      req.body.arrivTime,
      req.body.id])

  }
// if image 2

if(req.body.image2.length>100){

  const permit = {
    image: req.body.image2,
  };

  let link = await cloudinary.uploader.upload(permit.image, {
    folder: "mybus",
  });

  const newbus = await db.get('UPDATE busdetails SET busname = $1, registernumber = $2, bustype = $3 ,seats=$4, fromstart=$5, toend=$6, duration=$7, departuredate=$8 ,departuretime=$9, arraivaldate=$10 ,arraivaltime=$11,image2=$12  WHERE id = $13 RETURNING *',
    [req.body.busname,
    req.body.registerNUmber,
    req.body.busType,  //permit,image1,image2,image3,image4
    req.body.seats,
    req.body.from,
    req.body.to,
    req.body.duration,
    req.body.depDate,
    req.body.depTime,
    req.body.arrivDate,
    req.body.arrivTime,
    link.secure_url,
    req.body.id])

}else{

  const newbus = await db.get('UPDATE busdetails SET busname = $1, registernumber = $2, bustype = $3 ,seats=$4, fromstart=$5, toend=$6, duration=$7, departuredate=$8 ,departuretime=$9, arraivaldate=$10 ,arraivaltime=$11 WHERE id = $12 RETURNING *',
    [req.body.busname,
    req.body.registerNUmber,
    req.body.busType,
    req.body.seats,
    req.body.from,
    req.body.to,
    req.body.duration,
    req.body.depDate,
    req.body.depTime,
    req.body.arrivDate,
    req.body.arrivTime,
    req.body.id])

}
//if  image3
if(req.body.image3.length>100){

  const permit = {
    image: req.body.image3,
  };

  let link = await cloudinary.uploader.upload(permit.image, {
    folder: "mybus",
  });

  const newbus = await db.get('UPDATE busdetails SET busname = $1, registernumber = $2, bustype = $3 ,seats=$4, fromstart=$5, toend=$6, duration=$7, departuredate=$8 ,departuretime=$9, arraivaldate=$10 ,arraivaltime=$11,image3=$12  WHERE id = $13 RETURNING *',
    [req.body.busname,
    req.body.registerNUmber,
    req.body.busType,  //permit,image1,image2,image3,image4
    req.body.seats,
    req.body.from,
    req.body.to,
    req.body.duration,
    req.body.depDate,
    req.body.depTime,
    req.body.arrivDate,
    req.body.arrivTime,
    link.secure_url,
    req.body.id])

}else{

  const newbus = await db.get('UPDATE busdetails SET busname = $1, registernumber = $2, bustype = $3 ,seats=$4, fromstart=$5, toend=$6, duration=$7, departuredate=$8 ,departuretime=$9, arraivaldate=$10 ,arraivaltime=$11 WHERE id = $12 RETURNING *',
    [req.body.busname,
    req.body.registerNUmber,
    req.body.busType,
    req.body.seats,
    req.body.from,
    req.body.to,
    req.body.duration,
    req.body.depDate,
    req.body.depTime,
    req.body.arrivDate,
    req.body.arrivTime,
    req.body.id])

}

//if image4
if(req.body.image4.length>100){

  const permit = {
    image: req.body.image4,
  };

  let link = await cloudinary.uploader.upload(permit.image, {
    folder: "mybus",
  });

  const newbus = await db.get('UPDATE busdetails SET busname = $1, registernumber = $2, bustype = $3 ,seats=$4, fromstart=$5, toend=$6, duration=$7, departuredate=$8 ,departuretime=$9, arraivaldate=$10 ,arraivaltime=$11,image4=$12  WHERE id = $13 RETURNING *',
    [req.body.busname,
    req.body.registerNUmber,
    req.body.busType, 
    req.body.seats,
    req.body.from,
    req.body.to,
    req.body.duration,
    req.body.depDate,
    req.body.depTime,
    req.body.arrivDate,
    req.body.arrivTime,
    link.secure_url,
    req.body.id])

}else{

  const newbus = await db.get('UPDATE busdetails SET busname = $1, registernumber = $2, bustype = $3 ,seats=$4, fromstart=$5, toend=$6, duration=$7, departuredate=$8 ,departuretime=$9, arraivaldate=$10 ,arraivaltime=$11 WHERE id = $12 RETURNING *',
    [req.body.busname,
    req.body.registerNUmber,
    req.body.busType,
    req.body.seats,
    req.body.from,
    req.body.to,
    req.body.duration,
    req.body.depDate,
    req.body.depTime,
    req.body.arrivDate,
    req.body.arrivTime,
    req.body.id])

}


return res.json({status : true})

  

})

// deleter bus

app.delete('/admin/deletebus/:id', (req,res)=>{
  console.log('THISIS DELETE FUNCTION ',req.params.id);
 
    db.get('DELETE FROM busdetails WHERE id = $1', [req.params.id])
    
    res.json({status: true})
   
})








app.post("/user/otp/request", async(req, res) => {
  console.log('//////////');
 let exitst= await db.get('SELECT * FROM users WHERE email = $1',[req.body.Email])

 if(exitst.rows[0]){
   console.log("user exist ",exitst.rows[0]);
   return res.json({status:"exist"})
 }else{
  console.log("user not exist ",exitst.rows[0]);
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
        const id= newUser.rows[0].id
        const userName = newUser.rows[0].name;
        const userEmail = newUser.rows[0].email;

        var token = jwt.sign(
          { 
            id:id,
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

app.post('/user/Login',async(req,res)=>{

  console.log(req.body);
  let user= await db.get('SELECT * FROM users WHERE email = $1',[req.body.Email])
  console.log(user.rows[0]);

  if(user.rows[0]){

    const validPassword = await bcrypt.compare(
      req.body.Password,
      user.rows[0].password
    );

     if(validPassword){

      const id= user.rows[0].id
      const userName = user.rows[0].name;
      const userEmail = user.rows[0].email;

      var token = jwt.sign(
        { 
          id:id,
          name: userName,
          email: userEmail,
        },
        "secret123"
      );
      return res.json({ status: true, userToken: token });




     
     }else{
      res.json({status:0})
     }

   
  }else{
    res.json({status:false})
  }


})

app.post('/user/otp/Login',async(req,res)=>{
 
  console.log(req.body);
  let user= await db.get('SELECT * FROM users WHERE mobile = $1',[req.body.mobileNumber])
  console.log(user.rows[0]);

  if(user.rows[0]){
   
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

   
  }else{
    res.json({status:false})
  }


})


app.post('/user/otp/login/verify',(req,res)=>{
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

        let user= await db.get('SELECT * FROM users WHERE mobile = $1',[req.body.MOB])
       
        console.log("FORM SUCCESSFULLY SUBMITTED");
        const id= user.rows[0].id
        const userName = user.rows[0].name;
        const userEmail = user.rows[0].email;

        var token = jwt.sign(
          { 
            id:id,
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




















         
//super admin section

app.post('/super/admin/Login', async (req, res) => {

  let result = await db.get("select * from superadmin")
  console.log(result);
  if (!result.rows[0]) {
    console.log('new super admin')
    console.log('super user login',req.body);
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









