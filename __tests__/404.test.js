'use strict';

const { server } = require('../server.js');
const supertest = require('supertest');

//Note to self: found out that when I make the route work (not Error out) it doesnt work and the test quits do to a process timeout. 
//I believe this is because I have written the entire await statement on one line so the function isn't waiting to run expect.
//The test ends up not completing.

describe('test 404 error middlware', () => {
    test('incorrect route responds with: ERROR: Route not found', async () => {
        await supertest(server).get('/bananas').expect('ERROR: Route not found').expect(404);
        // This works to:
        // const res = await supertest(server).get('/pizza');
        // expect(res.text).toBe('ERROR: Route not found');
    });
    test('incorrect method responds with: ERROR: This route is for GET requests only', async () => {
        await supertest(server).post('/person?name=sara').expect('ERROR: This route is for GET requests only').expect(404);
    });
});