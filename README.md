# I want pizza api

This is the API for [I want pizza](https://github.com/rvillaverde/iwantpizza) demo.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run test`

Runs tests.<br>


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

### `GET /orders`

Returns all orders with customer and items information.

### `GET /orders/:id`

Returns the order given its id with customer and items information.

### `POST /orders/`

Persist order in the database.