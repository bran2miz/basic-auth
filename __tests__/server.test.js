'use strict';

const server = require('../src/server.js');
const supertest = require('supertest');
const mockServer = supertest(server);
const {sequelizeDatabase} = require('../src/auth/models')
const base64 = require('base-64');



const user1 = {username: 'brandon', password: 'password'};

const user2 = {username: 'john', password: 'password2'}


beforeAll(async () => {
    await sequelizeDatabase.sync();
    
});

afterAll(async () => {
    await sequelizeDatabase.drop();
    
})

// POST to /signup to create a new user

describe('test the server routes and db', () => {
    test("we can post a new user to /signup", async () => {
        // when we send a req to /signup {password username} via req.body route and get back status: 200 and object: user object made from the model based on the data we sent
        // mockServer.body = user1;

        const response = await mockServer.post('/signup').send(user1);

        expect(response.status).toBe(200);
        expect(JSON.parse(response.text).username).toBe('brandon');
        expect(JSON.parse(response.text).password).toBeDefined();
    });

    test("we can send a user via basic auth to /signin", async () => {
       // must be a user we have already added ^^^ 
        const response = await mockServer.post("/signin").auth(user1.username, user1.password);
        
        expect(response.status).toBe(200);
        expect(JSON.parse(response.text).username).toBe('brandon');
        expect(JSON.parse(response.text).password).toBeDefined();
    })
})

// POST to /signin to login as a user (use basic auth).
// when we send a req to /signin we will include the encoded username:password on the Basic auth... we will get back status 200 and same user object: user object made from the model based on the data we sent

// Need tests for auth middleware and the routes
// Does the middleware function (send it a basic header)
// Do the routes assert the requirements (signup/signin)