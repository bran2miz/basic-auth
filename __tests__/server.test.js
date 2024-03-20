const supertest = require('supertest');
const {server} = require('../server.js');
const mockRequest = supertest(server);
const { dbInstance } = require('../models/index.js')

describe('server routes and functionality', () => {
    beforeAll(async() => {
        // before each test, connect to database
        await dbInstance.sync();
    });
    afterAll(async()=> {
        //disconnect after you run the test
        await dbInstance.drop();
    });
    it('can create a record', async() => {
        const person = {
            firstName: 'Hilde',
            lastName: 'Cute'
        };

        // res.body.firstName ? 'Hilde'
        // res.body.lastName ? 'Cute'

        // make a request to my route to people. I expect from the response to be a positive status of 200
        const response = await mockRequest.post('/people').send(person);
        expect(response.status).toBe(200);

        //expect the response.body to have an id
        expect(response.body.id).toBeDefined();

        // testing for each key that I sent in that i have an equal key that is coming back
        Object.keys(person).forEach((key) => {
            expect(person[key]).toEqual(response.body[key]);
        })
    })
})
