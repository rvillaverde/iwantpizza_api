const chai = require('chai')
const expect = chai.expect;

describe('models/product', function() {
  let defaultProduct;
  let defaultProps = {
    name: 'product name',
    description: 'product description',
    price: 10,
    photo_url: 'product photo url'
  }

  beforeEach(async function() {
    await require('../../models').product.sync({ force : true });
    this.product = require('../../models').product;
    defaultProduct = await this.product.create(defaultProps);
  });

  describe('findAll', function() {
    it('returns array of products', function() {
      this.product.findAll().bind(this).then(function(products) {
        expect(products).to.be.an('array');
        expect(products.length).to.equal(1);
      });
    });
  });

  describe('findByPk', function() {
    it('returns product', function() {
      this.product.findByPk(defaultProduct.product_id).bind(this).then(function(product) {
        expect(product.product_id).to.equal(defaultProduct.product_id);
      });
    });
  });

  describe('create', function() {
    it('creates product', function() {
      this.product.create(defaultProps).bind(this).then(function(product) {
        expect(product.product_id).to.be.ok;
        Object.keys(defaultProps).forEach(prop => {
          expect(product.get(prop)).to.equal(defaultProps[prop]);
        })
      });
      this.product.findAll().bind(this).then(function(products) {
        expect(products).to.be.an('array');
        expect(products.length).to.equal(2);
      });
    });
  });

  describe('delete', function() {
    it('deletes the product', function() {
      this.product.destroy({ where: { product_id: defaultProduct.product_id }}).bind(this).then(function(deleted) {
        expect(deleted).to.be.equal(1);
      });
      this.product.findAll().bind(this).then(function(products) {
        expect(products).to.be.an('array');
        expect(products.length).to.equal(0);
      });
    });
  });
});