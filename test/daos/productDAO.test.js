const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai')
const expect = chai.expect;

describe('DAOS/product', function() {
  const productId = 1;

  const defaultProduct = {
    name: 'product name',
    description: 'product description',
    price: 10,
    photo_url: 'product photo url'
  }

  const modelsStub = {
    product: {
      findAll: async () => [ defaultProduct ],
      findByPk: async (id) => Object.assign(defaultProduct, { product_id: id }),
      create: async (product) => Object.assign(product, { product_id: productId }),
      destroy: async (id) => 1
    }
  }

  before(async function() {
    this.productDAO = proxyquire('../../daos/productDAO', {'../models': modelsStub});
  });

  describe('getProducts', function() {
    it('returns array of products', function() {
      return this.productDAO.getProducts().then(function(products) {
        expect(products).to.be.an('array');
        expect(products.length).to.equal(1);
      });
    });
  });

  describe('getProduct', function() {
    it('returns product', function() {
      return this.productDAO.getProduct(productId).then(function(product) {
        expect(product.product_id).to.equal(productId);
      });
    });
  });

  describe('createProduct', function() {
    it('creates product', function() {
      const spy = chai.spy.on(modelsStub.product, 'create');

      return this.productDAO.createProduct(defaultProduct).then(function(product) {
        expect(product.product_id).to.equal(productId);
        expect(spy).to.have.been.called.once.with(defaultProduct);
      });
    });
  });

  describe('deleteProduct', function() {
    it('deletes the product', function() {
      const spy = chai.spy.on(modelsStub.product, 'destroy');

      return this.productDAO.deleteProduct(productId).then(function(deleted) {
        expect(deleted).to.equal(1);
        expect(spy).to.have.been.called.once;
      });
    });
  });
});
