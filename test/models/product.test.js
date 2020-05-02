const expect = require('expect.js');

describe('models/product', function() {
  let defaultProduct;
  let defaultProps = {
    name: 'product name',
    description: 'product description',
    price: 10,
    photo_url: 'product photo url'
  }

  before(async function() {
    await require('../../models').product.sync();
    this.product = require('../../models').product;
    defaultProduct = await this.product.create(defaultProps);
  });

  describe('findAll', function() {
    it('returns list of products', function() {
      return this.product.findAll().bind(this).then(function(products) {
        expect(products).to.be.an('array');
        expect(products.length).to.be(1);
      });
    });
  });

  describe('findByPk', function() {
    it('returns product', function() {
      return this.product.findByPk(defaultProduct.product_id).bind(this).then(function(product) {
        expect(product.product_id).to.be(defaultProduct.product_id);
      });
    });
  });

  describe('create', function() {
    it('creates product', function() {
      return this.product.create(defaultProps).bind(this).then(function(product) {
        expect(product.product_id).to.be.ok();
        Object.keys(defaultProps).forEach(prop => {
          expect(product.get(prop)).to.equal(defaultProps[prop]);
        })
      });
    });
  });
});