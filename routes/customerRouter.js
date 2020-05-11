const express = require('express');
const router = express.Router();

const CustomerService = require('../services/customerService.js');

// GET method to retrieve all customers
router.get('/', async function(request, response) {
  let customers = await CustomerService.getCustomers();
  response.status(200).send(customers);
});

// GET method to retrieve a customer given its id
router.get('/:id', async function(request, response) {
  let id = request.params.id;
  let customer = await CustomerService.getCustomer(id);
  response.status(200).send(customer);
});

module.exports = router;
