const express = require('express');
const port =  process.env.PORT || 3000;

const path = require('path');

/* ---------------------
-- Express App config --
------------------------ */
let app = express();

const ProductService = require('./lib/productService.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// GET method to retrieve all products
app.get('/products', async function(request, response) {
  let products = await ProductService.getProducts();
  response.status(200).send(products);
});

// GET method to retrieve a product given its id
app.get('/products/:id', async function(request, response) {
  let id = request.params.id;
  let product = await ProductService.getProduct(id);
  response.status(200).send(product);
});

app.listen(port, function() {
  console.log('Server running at port 3000: http://localhost:3000');
});

// GET method to prevent 404 not found
/*app.get('*', function(request, response) { response.redirect('/') });*/
