
sudo -u postgres psql

CREATE DATABASE mybus;




 CREATE TABLE users(
   id  SERIAL PRIMARY KEY ,
   name TEXT NOT NULL,
   email VARCHAR(50)  NOT NULL,
   password VARCHAR(100)  NOT NULL,
   mobile VARCHAR(15) NOT NULL
 ) ;



 --super admin 
 CREATE TABLE superadmin(
   id  SERIAL PRIMARY KEY ,
   super_admin_email VARCHAR(50)  NOT NULL,
   super_admin_password VARCHAR(100)  NOT NULL
 ) ;



CREATE TABLE owners(
   owner_id  SERIAL PRIMARY KEY ,
   owner_name TEXT NOT NULL,
   owner_email VARCHAR(50)  NOT NULL,
   owner_password VARCHAR(100)  NOT NULL,
   blocked BOOLEAN NOT NULL,
   mobile VARCHAR(15) NOT NULL,
   company VARCHAR(50)  NOT NULL
 ) ;


 CREATE TABLE busdetails(
   id SERIAL PRIMARY KEY ,
   owner_id INT NOT NULL,
   busname TEXT NOT NULL,
   registernumber TEXT NOT NULL,
   bustype VARCHAR(10) NOT NULL,
   seats INT NOT NULL,
   fromStart TEXT NOT NULL,
   toEnd TEXT NOT NULL ,
   prize INT NOT NULL,
   departuretime TIMESTAMP NOT NULL,
   arraivaltime TIMESTAMP NOT NULL,
   permit TEXT NOT NULL,
   image1 TEXT NOT NULL,
   image2 TEXT NOT NULL,
   image3 TEXT NOT NULL,
   image4 TEXT NOT NULL
  );

  -- // let diff= date2-date
  -- // console.log(date, date2 ,   "      :", diff );

  -- // var minutes = Math.floor(diff / 60000);
  
  -- // console.log(minutes);

  -- // let samp = moment.duration(minutes, "minutes").format("d [days],h [hrs], m [min]");
  -- // console.log(samp, '++++++++++++++++++++++++++++++++++++++')