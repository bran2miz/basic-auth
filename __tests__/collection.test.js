'use strict';

const {dbInstance, customerCollection, orderCollection} = require('../models');

beforeAll(async()=> {
    await dbInstance.sync();
});

afterAll(async()=> {
    await dbInstance.drop();
})

describe('Customers and Orders Collections', () => {
    let testCustomer = {
        name: 'test customer',
        email: 'testEmail@test.com'
    }
    let testOrder = {
        description: 'test order',
        customerId: 1,
    }

    let customers = null;
    let customer = null;
    let orders = null;
    let order = null;

    it('should be able to create a Customer and an Order', async() => {
        // create a customer using the dummy info from the object above
        customer = await customerCollection.create(testCustomer);
        // we use the customer we get back to create the order
        testOrder['customerId'] = customer.id;
        order = await orderCollection.create(testOrder);

        expect(customer.name).toEqual(testCustomer.name);
        expect(order.description).toEqual(testOrder.description)
        expect(order.customerId).toEqual(customer.id)
    })

    it('should be able to fetch order', async () => {
        let retrievedCustomer = await customerCollection.read(1);
        expect(retrievedCustomer.name).toEqual("test customer")
    })
})
