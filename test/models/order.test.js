const expect = require('expect.js');

describe('models/order', function() {
  let defaultOrder, defaultCustomer, defaultProduct;
  let orderProps = {
    subtotal: 20,
    shipping_fee: 5
  }

  let customerProps = {
    first_name: 'first name',
    last_name: 'last name',
    email: 'email',
    phone: 'phone number',
    address_line_1: 'address line 1',
    address_line_2: 'address line 2',
    postal_code: 'postal code'
  }

  let productProps = {
    name: 'product name',
    description: 'product description',
    price: 10,
    photo_url: 'product photo url'
  }

  let items = [
    {
      product_id: 1,
      quantity: 2
    }
  ];

  before(async function() {
    await require('../../models').sequelize.sync();
    this.order = require('../../models').order;
    this.customer = require('../../models').customer;
    this.product = require('../../models').product;

    //defaultProduct = await this.product.create(productProps);
    defaultCustomer = await this.customer.create(customerProps);
    orderProps.customer_id = defaultCustomer.customer_id;
    defaultOrder = await this.order.create(orderProps);
  });

  describe('findAll', function() {
    it('returns list of orders', function() {
      return this.order.findAll().bind(this).then(function(orders) {
        expect(orders).to.be.an('array');
        expect(orders.length).to.be(1);
      });
    });
  });

  describe('findByPk', function() {
    it('returns order', function() {
      return this.order.findByPk(defaultOrder.order_id).bind(this).then(function(order) {
        expect(order.order_id).to.be(defaultOrder.order_id);
      });
    });
  });

  describe('create', function() {
    it('creates order', function() {
      return this.customer.create(customerProps).bind(this).then(function(customer) {
        orderProps.customer_id = customer.customer_id;
        return this.order.create(orderProps).bind(this).then(function(order) {
          expect(order.order_id).to.be.ok();
          Object.keys(orderProps).forEach(prop => {
            expect(order.get(prop)).to.equal(orderProps[prop]);
          })
        });
      });
    });
  });
});