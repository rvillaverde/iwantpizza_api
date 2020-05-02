const express = require('express');
var cors = require('cors');
const port =  process.env.PORT || 3000;

const path = require('path');

/* ---------------------
-- Express App config --
------------------------ */
let app = express();
app.use(cors());

const CustomerService = require('./lib/customerService.js');
const ProductService = require('./lib/productService.js');
const OrderService = require('./lib/orderService.js');
const ShippingService = require('./lib/shippingService.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// GET method to retrieve all products
app.get('/products', async function(request, response) {
  let ids = request.query.ids && request.query.ids.split(',');
  let products = await ProductService.getProducts(ids);
  response.status(200).send(products);
});

// GET method to retrieve a product given its id
app.get('/products/:id', async function(request, response) {
  let id = request.params.id;
  let product = await ProductService.getProduct(id);
  response.status(200).send(product);
});

// GET method to retrieve all customers
app.get('/customers', async function(request, response) {
  let customers = await CustomerService.getCustomers();
  response.status(200).send(customers);
});

// GET method to retrieve a customer given its id
app.get('/customers/:id', async function(request, response) {
  let id = request.params.id;
  let customer = await CustomerService.getCustomer(id);
  response.status(200).send(customer);
});

// GET method to retrieve all orders
app.get('/orders', async function(request, response) {
  let orders = await OrderService.getOrders();
  response.status(200).send(orders);
});

// GET method to retrieve a order given its id
app.get('/orders/:id', async function(request, response) {
  let id = request.params.id;
  let order = await OrderService.getOrder(id);
  response.status(200).send(order);
});

// POST method to create an order
app.post('/orders', async function(request, response) {
  let customer = request.body.customer;
  let products = request.body.products;

  let order = {};
  order.customer_id = await CustomerService.createCustomer(customer);
  order.shipping_fee = ShippingService.calculateShipping(customer.postal_code);
  order.order_id = await OrderService.createOrder(order, products);

  response.status(200).send({ order_id: order.order_id });
});

app.get('/shipping', async function(request, response) {
  let postalCode = request.query.postal_code;
  let shippingFee = ShippingService.calculateShipping(postalCode);
  response.status(200).send({ fee: shippingFee });
});

app.listen(port, function() {
  console.log('Server running at port 3000: http://localhost:3000');
});

// GET method to prevent 404 not found
/*app.get('*', function(request, response) { response.redirect('/') });*/
