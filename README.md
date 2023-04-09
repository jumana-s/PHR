# PHR Web Application

![Image of website](webpage.png)

## Description
PHR, Personal Health Record, is a set of online tools people can use to access, organize, and make appropriate portions of their lifelong health information available to those who need it. In particular, a person's PHR can contain information on their family history, immunization records, allergies, medications, list of illnesses, dates of surgeries, and doctor's name and phone number.

Since this PHR is online, one may access it from any device. Any PHR
system must include privacy and security features because PHRs contain sensitive information.  A user should only be permitted access to data in some distributed systems if they possess a specific set of credentials or attributes. We can implement comprehensive access control on encrypted data thanks to CP-ABE, CiphertextPolicy Attribute-Based Encryption. A set of attributes identifies an individual user in an ABE (Attribute Based Encryption) system. Only when both sets of attributes overlap can a
secret key based on a set of attributes be used to decrypt ciphertext encrypted with a public key based on a set of attributes. In CP-ABE, a secret key is associated with a set of attributes, while the ciphertext is associated with the access policy. The encrypting party chooses the policy, a set of attributes, under which the data can be decoded.

This project is a web application that allows users to share and manage their personal health records. Our project will encrypt the PHRs using CP-ABE, Ciphertext-Policy Attribute-Based Encryption, to make sure that the private data on them is safeguarded. A user can log in, edit their PHRs, control who has access to them, and view other PHRs that have been shared with them.

## Components
- This project has a frontend composed of React and MUI.  
- Its backend consists of Python and Flask.  The backend uses the [Charm Framework](https://github.com/JHUISI/charm) for cryptography.
  - The frontend and backend communicate via the backend's REST API.  
- The backend also uses a PostgreSQL database.

## Local dev setup (Ubuntu)

Setup instructions for database, backend, and frontend

### Database

1. Install postgres for [Linux](https://www.postgresql.org/download/linux/ubuntu/)
2. Run `sudo -iu postgres psql` to run postgres locally
3. Create database flask `CREATE DATABASE flask;`
4. Create user admin `CREATE USER admin SUPERUSER LOGIN PASSWORD 'admin';`
5. Connect to databse flask `\c flask`
6. Drop tables

```
 DROP TABLE inbox;
 DROP TABLE phr;
 DROP TABLE attributes;
 DROP TABLE login;
 DROP TABLE users;
```

7. Create tables

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
```

### Backend

1. Go to directory backend `cd my-app/backend`
2. Build Dockerfile `docker build -t backend .`
3. Run Docker image `docker run --network host --env DB_USERNAME=admin --env DB_PASSWORD=admin -p 5000:5000 -v vol:/app -d backend`

### Frontend

1. Go to directory my-app `cd my-app`
2. Install node packages `npm install`
3. Start React App `npm start`
