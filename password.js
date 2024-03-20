'use strict';

// two new libraries
const base64 = require('base-64');
const bcrypt = require("bcrypt");

console.log('----------- base 64 ----------')

// encode using base 64 - can be decoded 
let string = "I love pizza";
// I love pizza is going to be the password

let encodedStr = base64.encode(string);
console.log(encodedStr);

let decodedStr = base64.decode(encodedStr);

console.log(decodedStr);

// we use the base64 encoded string in the Basic Auth for the req header
// basic auth string: Basic <some encoded value>
// the encoded value username:password
//  headers: {
//  Authorization: Basic eafjawiwefawe
// }

// Example of a basic auth header below:

let userAndPass = "Brandon:bran2miz";
const justThePassword = "bran2miz"
let encodedUserAndPass = base64.encode(userAndPass);

console.log("encoded userName and Password: ", {encodedUserAndPass});
// expected output: { encodedUserAndPass: 'QnJhbmRvbjpicmFuMm1peg==' }

// server side:
// receive Basic eafjawiwefawe
// get the part that is encoded
// decode it
// separate or split it by colon (":")[1] 
// split(":")[0]
// encrypt the password

// Auth string

let authStr = `Basic ${encodedUserAndPass}`;

// To securely store data in the database we need it to be more safe - can't be decoded
// (https: securely passes this data from client to the server)

// it comes in encoded, we will decode it and store it safely or check against what we have stored. 

// const encrypt = async (password) => {
//   // tell it that it needs to have 5 rounds (adds more salt)
//   // the salt to be used to hash the password. If specified as a number then a salt will be generated with the specified number of rounds and used. 
//   let hash = await bcrypt.hash(password, 5);
//   console.log("user model: ",{name: justTheUser, password: hash});
//   return hash;
  
// }

const encrypt = async (password) => {
  // tell it that it needs to have 5 rounds (adds more salt)
  // the salt to be used to hash the password. If specified as a number then a salt will be generated with the specified number of rounds and used. 
  let hash = await bcrypt.hash(password, 5);
  let resultOne = await bcrypt.compare(password, hash);
  const oneOfBrandonsHashsThatWeCopied = "$2b$05$WvaNlKNCIELLB0sLhyZJtu6jlj52fGZh/C085Nl2xcHM0Irnxf7Oy";
  let resultBrandon = await bcrypt.compare(password, oneOfBrandonsHashsThatWeCopied);

  console.log("boolean result from the compared passwords: ", resultOne);

  console.log("boolean resulted from plugged in password: ", resultBrandon)
}


console.log("--------------- bcrypt ---------------");

// truthy test
// const encryptedPW = encrypt(justThePassword);

// expected output: (hash:  $2b$05$ZWnml3.W93FuL.9uBrjE/eUvrjT60v0hIkwE/e5AsswrEsoICAN6u)
// extra stuff at the end is called salt. Random piece of data to create a unique hash.


//faulty test
const encryptedPW = encrypt("ILoveChicken100");



const justTheUser = "Brandon"

// in our user model we would have something like this:
console.log({name: justTheUser, password: encryptedPW})
// go to the database with username, retrieve the input, compare the password...if it checks out they are who they say they are, otherwise YOU SHALL NOT PASS

