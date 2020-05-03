const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai')
const spies = require('chai-spies');

const expect = chai.expect;
chai.use(spies);

describe('DAOS/customer', function() {
  const customerId = 1;

  const defaultCustomer = {
    first_name: 'first name',
    last_name: 'last name',
    email: 'email',
    phone: 'phone number',
    address_line_1: 'address line 1',
    address_line_2: 'address line 2',
    postal_code: 'postal code'
  }

  const modelsStub = {
    customer: {
      findAll: async () => [ defaultCustomer ],
      findByPk: async (id) => Object.assign(defaultCustomer, { customer_id: id }),
      create: async (customer) => Object.assign(customer, { customer_id: customerId }) 
    }
  }

  before(async function() {
    this.customerDAO = proxyquire('../../daos/customerDAO', {'../models': modelsStub});
  });

  describe('getCustomers', function() {
    it('returns array of customer', function() {
      return this.customerDAO.getCustomers().then(function(customers) {
        expect(customers).to.be.an('array');
        expect(customers.length).to.equal(1);
      });
    });
  });

  describe('getCustomer', function() {
    it('returns customer', function() {
      return this.customerDAO.getCustomer(customerId).then(function(customer) {
        expect(customer.customer_id).to.equal(customerId);
      });
    });
  });

  describe('createCustomer', function() {
    it('creates customer', function() {
      const spy = chai.spy.on(modelsStub.customer, 'create');

      return this.customerDAO.createCustomer(defaultCustomer).then(function(customer) {
        expect(customer.customer_id).to.equal(customerId);
        expect(spy).to.have.been.called.once.with(defaultCustomer);
      });
    });
  });
});