const express = require('express');
const router = express.Router();

const ShippingService = require('../services/shippingService.js');

router.get('/', async function(request, response) {
  let postalCode = request.query.postal_code;
  let shippingFee = ShippingService.calculateShipping(postalCode);
  response.status(200).send({ fee: shippingFee });
});

module.exports = router;
