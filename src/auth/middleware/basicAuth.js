'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
// curly brackets means it will come in as an object
const { userModel } = require('../models/index.js');

const basicAuth = async (req, res, next) => {
  let basicHeaderParts = req.headers.authorization.split(' '); // ['Basic', 'am9objpmb28=']
  let encodedString = basicHeaderParts.pop(); // am9objpmb28=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password

  /*
        Now that we finally have username and password, let's see if it's valid
        1. Find the user in the database by username
        2. Compare the plaintext password we now have against the encrypted password in the db
           - bcrypt does this by re-encrypting the plaintext password and comparing THAT
        3. Either we're valid or we throw an error
      */
  try {
    const user = await userModel.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      // if I have a valid user attach the user to the request
      // send the next()
      req.user = user;
      next();
      // res.status(200).json(user);
    } else {
      throw new Error('Invalid User');
    }
  } catch (error) {
    //TODO
    // send the error message as next("error message");
    // write error handling middleware
    res.status(403).send('Invalid Login');
}

}


module.exports = basicAuth;