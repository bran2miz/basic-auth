'use strict';

require('dotenv').config();
const {sequelizeDatabase} = require('./src/auth/models')
const PORT = process.env.PORT || 3002;
const server = require('./src/server.js');



sequelizeDatabase.sync().then(() => server.listen(PORT)).catch(e => console.log(e));


// start function that takes in PORT
