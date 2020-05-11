const express = require('express');
const fileUpload = require('express-fileupload');
var cors = require('cors');
const port =  process.env.PORT || 3000;

const path = require('path');

/* ---------------------
-- Express App config --
------------------------ */
let app = express();
app.use(cors());

app.use(fileUpload({
  createParentPath: true
}));

const models = require('./models');

const customerRouter = require('./routes/customerRouter.js');
const orderRouter = require('./routes/orderRouter.js');
const productRouter = require('./routes/productRouter.js');
const shippingRouter = require('./routes/shippingRouter.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/customers', customerRouter);
app.use('/orders', orderRouter);
app.use('/products', productRouter);
app.use('/shipping', shippingRouter);

// Index GET method
app.get('/', async function(request, response) {
  response.status(200).send('Welcome to I want pizza API.');
});

models.sequelize.sync().then(function () {
  app.listen(port, function() {
    console.log(`Server running at port ${ port }: http://localhost:${ port }`);
  });
});

// GET method to prevent 404 not found
app.get('*', function(request, response) { response.redirect('/') });
