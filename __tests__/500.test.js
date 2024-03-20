'use strict';

const server = require('../src/server.js')
const supertest = require('supertest');
const mockServer = supertest(server);

describe('bad login', () => {
  it('fails with known user and wrong password', async () => {
    const response = await mockServer.post('/signin').auth('bran2miz', 'passwerd');
    const user = response.body;

    // expect(response.status).toBe(500);
    expect(user.id).not.toBeDefined();



  });
});

