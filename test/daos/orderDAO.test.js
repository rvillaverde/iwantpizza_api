const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai')
const spies = require('chai-spies');

const expect = chai.expect;
chai.use(spies);

describe('DAOS/order', function() {
  const orderId = 1;

  const defaultOrder = {
    currency: 'usd',
    subtotal: 20,
    shipping_fee: 5
  }

  let items = [{
    id: 1,
    quantity: 2
  }];

  const modelsStub = {
    order: {
      findAll: async () => [ defaultOrder ],
      findByPk: async (id) => Object.assign(defaultOrder, { order_id: id }),
      create: async (order) => Object.assign(order, { order_id: orderId }) 
    },
    order_product: {
      bulkCreate: (orderProduct) => orderProduct
    }
  }

  before(async function() {
    this.orderDAO = proxyquire('../../daos/orderDAO', {'../models': modelsStub});
  });

  describe('getOrders', function() {
    it('returns array of orders', function() {
      return this.orderDAO.getOrders().then(function(orders) {
        expect(orders).to.be.an('array');
        expect(orders.length).to.equal(1);
      });
    });
  });

  describe('getOrder', function() {
    it('returns order', function() {
      return this.orderDAO.getOrder(orderId).then(function(order) {
        expect(order.order_id).to.equal(orderId);
      });
    });
  });

  describe('createOrder', function() {
    it('creates order', function() {
      const orderSpy = chai.spy.on(modelsStub.order, 'create');
      const orderProductSpy = chai.spy.on(modelsStub.order_product, 'bulkCreate');

      return this.orderDAO.createOrder(defaultOrder, items).then(function(order) {
        expect(order.order_id).to.equal(orderId);
        expect(orderSpy).to.have.been.called.once.with(defaultOrder);
        expect(orderProductSpy).to.have.been.called.once;
      });
    });
  });
});