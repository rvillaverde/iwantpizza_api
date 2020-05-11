const express = require('express');
const router = express.Router();

const OrderService = require('../services/orderService.js');

// GET method to retrieve all orders
router.get('/', async function(request, response) {
  let orders = await OrderService.getOrders();
  response.status(200).send(orders);
});

// GET method to retrieve a order given its id
router.get('/:id', async function(request, response) {
  let id = request.params.id;
  let order = await OrderService.getOrder(id);
  response.status(200).send(order);
});

// POST method to create an order
router.post('/', async function(request, response) {
  let customer = request.body.customer;
  let products = request.body.products;

  let order = {};
  order.currency = request.body.currency;
  order.customer_id = await CustomerService.createCustomer(customer);
  order.shipping_fee = ShippingService.calculateShipping(customer.postal_code);
  order.order_id = await OrderService.createOrder(order, products);

  response.status(201).send({ order_id: order.order_id });
});

module.exports = router;
