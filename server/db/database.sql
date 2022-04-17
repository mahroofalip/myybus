
sudo -u postgres psq

CREATE DATABASE mybus;


CREATE TABLE owners(
   owner_id  SERIAL PRIMARY KEY ,
   owner_name TEXT NOT NULL,
   owner_email VARCHAR(50)  NOT NULL,
   owner_password VARCHAR(100)  NOT NULL
 ) ;

 CREATE TABLE users(
   id  SERIAL PRIMARY KEY ,
   name TEXT NOT NULL,
   email VARCHAR(50)  NOT NULL,
   password VARCHAR(100)  NOT NULL,
   mobile VARCHAR(15) NOT NULL
 ) ;

 CREATE TABLE busdetails(
   id SERIAL PRIMARY KEY ,
   busname TEXT NOT NULL,
   registernumber TEXT NOT NULL,
   busType VARCHAR(10) NOT NULL,
   seats INT NOT NULL,
   fromStart TEXT NOT NULL,
   toEnd TEXT NOT NULL,
   duration INT NOT NULL,
   departureDate DATE NOT NULL,
   departureTime TIME NOT NULL,
   arraivalDate DATE NOT NULL,
   arraivalTime TIME NOT NULL,
   permit TEXT NOT NULL,
   image1 TEXT NOT NULL,
   image2 TEXT NOT NULL,
   image3 TEXT NOT NULL,
   image4 TEXT NOT NULL
  );

 --super admin 
 CREATE TABLE superadmin(
   id  SERIAL PRIMARY KEY ,
   super_admin_email VARCHAR(50)  NOT NULL,
   super_admin_password VARCHAR(100)  NOT NULL
 ) ;
        
       
        