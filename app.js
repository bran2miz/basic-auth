'use strict';

require('dotenv').config();
// const express = require('express');
// const base64 = require('base-64');
// const bcrypt = require("bcrypt");
// const {Sequelize, DataTypes} = require('sequelize');

// // const PORT = process.env.PORT || 3002;

// const DATABASE_URL = process.env.DBURL;

// const sequelizeDatabase = new Sequelize(DATABASE_URL);

// const server = express();

// server.use(express.json());

// // this allows us to accept webform data aka process FORM input and add to request body
// server.use(express.urlencoded({extended: true}));

const userModel = sequelizeDatabase.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type:DataTypes.STRING,
    allowNull: false,
  }
})


// Hooks
// sequelize allows us to interact with the usermodel before adding data to the database using the beforeCreate hook. 

userModel.beforeCreate((user) => {
  console.log("this is the user I am about to create", user)
})

// const basicAuth = async(req, res, next) => {
//   let { authorization } = req.headers;
//   // looks like this in headers: Basic eafjawiwefawe
//   // looks likes this when using split method: ["Basic", "eafjawiwefawe"]


//   // split Basic away from the encoded part
//   // split method splits the str into an array - the string is broken off into separate elements delinated by the value in the argument. 
//   let encodedStr = authorization.split(" ")[1];

//   console.log("separated encoded string: ",encodedStr)

//   // now we decode the encoded string 
//   let decodedStr = base64.decode(encodedStr);
//   // username:password
//   // ["username", "password"]

//   const [username, password] = decodedStr.split(":");

//   console.log('username and password', {username, password})

//   // find the model where the username matches

//   let user = await userModel.findOne({where: {username}})
//   console.log("I found the user: ". user);

//   if (!user) {
//     next('Not Authorized, no account exists');
//     // return?
//   }
//   // compare the password to the encrypted password saved in the user we get back
//   let isValid = await bcrypt.compare(password, user.password);

//   if (isValid) {
//     req.user = user;
//     next();
//   } else {
//     next('Not Authorized, password incorrect');
//   }
// }


// // if they are a valid user, put req.user object on to the request for the route to handle.
// server.post("/signup", async (req, res, next) => {
//   try {
//     // they are creating a new account
//     const {username, password} = req.body;
//     const encryptedPW = await bcrypt.hash(password, 5);

//     // save to my database
//     let newUser = await userModel.create({username, password: encryptedPW});

//     res.status(200).send(newUser);
//   }
//   catch (e) {
//     next('signup error occurred');
//   }
// });

// server.post("/signin", basicAuth, (req, res, next) => {
//   res.status(200).send(req.user);
// });

// sequelizeDatabase.sync().then(() => server.listen(PORT)).catch(e => console.log(e));