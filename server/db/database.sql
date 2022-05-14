sudo -u postgres psql

CREATE DATABASE mybus;

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
   company VARCHAR(50)  NOT NULL,
   status TEXT NOT NULL,
   birthday TEXT ,
   gender TEXT ,
   matrialstatus TEXT,
   image1 TEXT 
 ) ;


 CREATE TABLE users(
   id  SERIAL PRIMARY KEY ,
   name TEXT NOT NULL,
   email VARCHAR(50)  NOT NULL,
   password VARCHAR(100)  NOT NULL,
   mobile VARCHAR(15) NOT NULL,
   status TEXT NOT NULL,
   birthday TEXT ,
   gender TEXT ,
   matrialstatus TEXT,
   image1 TEXT ,
  blocked BOOLEAN NOT NULL
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

  
    CREATE TABLE passangers(
    id SERIAL PRIMARY KEY ,
    trip_id INT NOT NULL,
    passanger_seat INT NOT NULL,
    passanger_name TEXT NOT NULL,
    passanger_age INT NOT NULL,
    passanger_gender TEXT NOT NULL,
    bus_id INT NOT NULL,
    trip_date TEXT NOT NULL,
    mobile TEXT NOT NULL,
    email TEXT NOT NULL,
    status INT NOT NULL,
    owner_id INT NOT NULL,
    total INT NOT NULL

 );


 CREATE TABLE tripdetails(
   tripid SERIAL PRIMARY KEY NOT NULL ,
   bus_id INT NOT NULL,
   user_id INT NOT NULL,
   contact_email TEXT NOT NULL,
   contact_mobile VARCHAR(15) NOT NULL,
   arrivdate TEXT NOT NULL,
   depdate TEXT NOT NULL,
   dep_place TEXT NOT NULL,
   arr_place TEXT NOT NULL,
   status INT NOT NULL,
   tripStataus TEXT NOT NULL,
   total INT NOT NULL,  
   booking_date TIMESTAMP NOT NULL,
   owner_id INT NOT NULL
);


  