# I want pizza api

This is the API for [I want pizza](https://github.com/rvillaverde/iwantpizza) demo.

## Getting started

Before you start up the server, run

### `npm install`

to install all the dependencies.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run test`

Runs tests for models and DAOs.<br>


## Available endpoints

### `GET /customers`

Returns all customers.

### `GET /customers/:id`

Returns the customer given its id.

### `POST /customers/`

Persist customer in the database.

### `GET /products`

Returns all products.

### `GET /products/:id`

Returns the product given its id.

### `POST /products/`

Persist product in the database.

### `POST /products/:id/delete`

Delete product from the database.

### `GET /orders`

Returns all orders with customer and items information.

### `GET /orders/:id`

Returns the order given its id with customer and items information.

### `POST /orders/`

Persist order in the database.
