'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
// curly brackets means it will come in as an object
const { userModel } = require('../models');

const basicAuth = async(req, res, next) => {
  let { authorization } = req.headers;
  // looks like this in headers: Basic eafjawiwefawe
  // looks likes this when using split method: ["Basic", "eafjawiwefawe"]


  // split Basic away from the encoded part
  // split method splits the str into an array - the string is broken off into separate elements delinated by the value in the argument. 
  let encodedStr = authorization.split(" ")[1];

  console.log("separated encoded string: ",encodedStr)

  // now we decode the encoded string 
  let decodedStr = base64.decode(encodedStr);
  // username:password
  // ["username", "password"]

  const [username, password] = decodedStr.split(":");

  console.log('username and password', {username, password})

  // find the model where the username matches

  let user = await userModel.findOne({where: {username}})
  console.log("I found the user: ". user);

  if (!user) {
    next('Not Authorized, no account exists');
    // return?
  }
  // compare the password to the encrypted password saved in the user we get back
  let isValid = await bcrypt.compare(password, user.password);

  if (isValid) {
    req.user = user;
    next();
  } else {
    next('Not Authorized, password incorrect');
  }
}

module.exports = basicAuth;