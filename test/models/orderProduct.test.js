const chai = require('chai')
const expect = chai.expect;

describe('models/order_product', function() {
  let defaultCustomer = {
    first_name: 'first name',
    last_name: 'last name',
    email: 'email',
    phone: 'phone number',
    address_line_1: 'address line 1',
    address_line_2: 'address line 2',
    postal_code: 'postal code'
  }

  let defaultProduct = {
    name: 'product name',
    description: 'product description',
    price: 10,
    photo_url: 'product photo url'
  }

  let defaultOrder = {
    currency: 'usd',
    subtotal: 20,
    shipping_fee: 5
  }

  before(async function() {
    await require('../../models').order_product.sync({ force : true });
    this.orderProduct = require('../../models').order_product;
    this.product = require('../../models').product;
    defaultProduct = await this.product.create(defaultProduct);
    this.customer = require('../../models').customer;
    defaultCustomer = await this.customer.create(defaultCustomer);
    defaultOrder.customer_id = defaultCustomer.customer_id;
    this.order = require('../../models').order;
    defaultOrder = await this.order.create(defaultOrder);
  });

  describe('createBulk', function() {
    it('creates order products', function() {
      const orderProducts = [{ 
        order_id: defaultOrder.order_id,
        product_id: defaultProduct.product_id,
        quantity: 2
      }]
      return this.orderProduct.bulkCreate(orderProducts).bind(this).then(function(order_products) {
        expect(order_products).to.be.an('array');
        expect(order_products.length).to.equal(1);
        expect(order_products[0].order_id).to.equal(defaultOrder.order_id);
        expect(order_products[0].product_id).to.equal(defaultProduct.product_id);
        expect(order_products[0].quantity).to.equal(orderProducts[0].quantity);
      });
    });
  });
});