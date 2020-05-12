const express = require('express');
const router = express.Router();

const ProductService = require('../services/productService.js');

// GET method to retrieve all products
router.get('/', async function(request, response) {
  let ids = request.query.ids && request.query.ids.split(',');
  let products = await ProductService.getProducts(ids);
  response.status(200).send(products);
});

// GET method to retrieve a product given its id
router.get('/:id', async function(request, response) {
  let id = request.params.id;
  let product = await ProductService.getProduct(id);
  response.status(200).send(product);
});

// POST method to create a product
router.post('', async function(request, response) {
  let product = request.body;
  let photo = request.files.photo;
  const product_id = (await ProductService.createProduct(product, photo)).product_id;
  response.status(201).send({ product_id: product_id });
});

// POST method to create a product
router.post('/edit', async function(request, response) {
  let product = request.body;
  let photo = request.files ? request.files.photo : undefined;

  await ProductService.updateProduct(product, photo);
  response.status(201).send({ product_id: product.product_id });
});

// POST method to create a product
router.post('/:id/delete', async function(request, response) {
  let id = request.params.id;
  let deleted = await ProductService.deleteProduct(id);
  response.status(200).send({ deleted: Boolean(deleted) });
});

module.exports = router;