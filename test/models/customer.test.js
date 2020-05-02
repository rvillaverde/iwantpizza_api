const expect = require('expect.js');

describe('models/customer', function() {
  let defaultCustomer;
  let defaultProps = {
    first_name: 'first name',
    last_name: 'last name',
    email: 'email',
    phone: 'phone number',
    address_line_1: 'address line 1',
    address_line_2: 'address line 2',
    postal_code: 'postal code'
  }

  before(async function() {
    await require('../../models').customer.sync();
    this.customer = require('../../models').customer;
    defaultCustomer = await this.customer.create(defaultProps);
  });

  describe('findAll', function() {
    it('returns list of customers', function() {
      return this.customer.findAll().bind(this).then(function(customers) {
        expect(customers).to.be.an('array');
        expect(customers.length).to.be(1);
      });
    });
  });

  describe('findByPk', function() {
    it('returns customer', function() {
      return this.customer.findByPk(defaultCustomer.customer_id).bind(this).then(function(customer) {
        expect(customer.customer_id).to.be(defaultCustomer.customer_id);
      });
    });
  });

  describe('create', function() {
    it('creates customer', function() {
      return this.customer.create(defaultProps).bind(this).then(function(customer) {
        expect(customer.customer_id).to.be.ok();
        Object.keys(defaultProps).forEach(prop => {
          expect(customer.get(prop)).to.equal(defaultProps[prop]);
        })
      });
    });
  });
});