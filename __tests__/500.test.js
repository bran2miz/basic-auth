'use strict';

const { server } = require('../server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('test 500 error middlware', () => {
    test('status code of 500 if no name is in the query string', async () => {
        const res = await mockRequest.get('/person?name=');
        expect(res.status).toBe(500);
    });
});