'use strict';

const supertest = require('supertest');
const { server } = require('../server');
const mockRequest = supertest(server);

const url = '/person?name=mark';
const regex = /name=(\w+)/;

describe('the request obj name parameter', () => {
    it('is present and sends a response status 200', async () => {
        const res = await mockRequest.get(url);
        expect(res.status).toBe(200);
    });
    it('is used to send the correct response obj', async () => {
        const res = await mockRequest.get(url);
        const match = url.match(regex);
        if (match) { const value = match[1]; return value };
        expect(res._body).toEqual({ "name" : value });
    });
});