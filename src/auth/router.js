'use strict';

// const server = express();
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
