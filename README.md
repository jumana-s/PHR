# PHR Web Application

PHR, Personal Health Record, is a set of online tools people can use to access, organize, and make appropriate portions of their lifelong health information available to those who need it.  In particular, a person's PHR can contain information on their family history, immunization records, allergies, medications, list of illnesses, dates of surgeries, and doctor's name and phone number.  

This project is a web application that allows users to share and manage their personal health records. Our project will encrypt the PHRs using CP-ABE, Ciphertext-Policy Attribute-Based Encryption, to make sure that the private data on them is safeguarded. A user can log in, edit their PHRs, control who has access to them, and view other PHRs that have been shared with them.

## Local dev setup (Ubuntu)
Setup instructions for database, backend, and frontend
### Database
1. Install postgres for [Linux](https://www.postgresql.org/download/linux/ubuntu/)
2. Run `sudo -iu postgres psql` to run postgres locally
3. Create database flask `CREATE DATABASE flask;`
4. Create user admin `CREATE USER admin SUPERUSER LOGIN PASSWORD 'admin';`
5. Connect to databse flask `\c flask`
6. Create tables 
```
 CREATE TABLE users (id INT GENERATED ALWAYS AS IDENTITY,
                                 fname varchar (100) NOT NULL,
                                 lname varchar (100) NOT NULL,
                                 PRIMARY KEY(id));
 CREATE TABLE login (id INT REFERENCES users,
                                 usr varchar (100) NOT NULL,
                                 pswd varchar (100) NOT NULL);
 CREATE TABLE attributes (id INT REFERENCES users,
                                 attribute varchar (100) NOT NULL);
 CREATE TABLE phr (id INT REFERENCES users,                   
                                 ciphertext BYTEA NOT NULL);
 CREATE TABLE inbox (id INT REFERENCES users, ciphertext varchar (10000) NOT NULL,
                                 sender INT REFERENCES users);
```
7. Drop tables
```
 DROP TABLE inbox;
 DROP TABLE phr;
 DROP TABLE attributes;
 DROP TABLE login;
 DROP TABLE users;
 
```

### Backend
1. Go to directory backend `cd my-app/backend`
2. Build Dockerfile `docker build -t backend .`
3. Run Docker image `docker run --network host --env DB_USERNAME=admin --env DB_PASSWORD=admin -p 5000:5000 -d backend`

### Frontend
1. Go to directory my-app `cd my-app`
2. Install node packages `npm install`
3. Start React App `npm start`
