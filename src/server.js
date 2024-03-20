'use strict';


require('dotenv').config();
const express = require("express");
const bcrypt = require('bcrypt');
const {userModel} = require('./auth/models');
const basicAuth = require('./auth/middleware/basicAuth');
const handle404 = require('./middleware/404');
const handle500 = require('./middleware/500');

const server = express();

server.use(express.json());

// this allows us to accept webform data aka process FORM input and add to request body
server.use(express.urlencoded({extended: true}));

// if they are a valid user, put req.user object on to the request for the route to handle.


// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
//IMPORTANT: MUST HAVE TWO TERMINALS RUNNING
server.post("/signup", async (req, res, next) => {
  try {
    // they are creating a new account
    const {username, password} = req.body;
    const encryptedPW = await bcrypt.hash(password, 5);

    // save to my database
    let newUser = await userModel.create({username, password: encryptedPW});

    res.status(200).send(newUser);
  }
  catch (e) {
    next('signup error occurred');
  }
});


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
server.post("/signin", basicAuth, (req, res, next) => {
  res.status(200).send(req.user);
});

server.use(handle404);
server.use(handle500);

module.exports = server;