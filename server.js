'use strict';

const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js');
const error404 = require('./errorHandlers/404.js');
const error500 = require('./errorHandlers/500.js');
const express = require('express');
const server = express();
const peopleRoutes = require('./routes/people.route.js')
const customerRoutes = require('./routes/customers.route.js')
const orderRoutes = require('./routes/orders.route.js')
// start function that will be used by index
function start(port) {
    server.listen(port, console.log("I am listening on " + port))
};

//add express.json() for req.body, parses the JSON
server.use(express.json());

server.use(logger);

server.use(peopleRoutes);
server.use(customerRoutes);
server.use(orderRoutes)
// write some test that will check the / route for "hello world"
server.get('/', ((req, res) => res.send('default route working')));

server.get('/person', validator, (req, res) => {
    const person = {
        name: req.query.name,
    }
    res.status(200).json(person);
});

server.use('*', error404);
server.use(error500);


module.exports = {
    server: server,
    start: port => {
      if (!port) { throw new Error("Missing Port"); }
      server.listen(port, () => console.log(`Listening on ${port}`));
    },
  };