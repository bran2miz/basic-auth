'use strict';

const server = require('../src/server.js');
const supertest = require('supertest');
const mockServer = supertest(server);
//Note to self: found out that when I make the route work (not Error out) it doesnt work and the test quits do to a process timeout. 
//I believe this is because I have written the entire await statement on one line so the function isn't waiting to run expect.
//The test ends up not completing.

describe('Functionality of server routes', () => {
    test('incorrect route responds with: ERROR: Route not found', () => {
        return mockServer.get('/pizza').then((results) => {
            expect(results.status).toBe(404);
        })
        // This works to:
        // const res = await supertest(server).get('/pizza');
        // expect(res.text).toBe('ERROR: Route not found');
    });
   
});