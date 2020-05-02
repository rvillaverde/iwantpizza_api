const models  = require('../models');

module.exports = {
  getProducts: function() {
    return new Promise((resolve, reject) => {
      models.product.findAll().then(products => {
        resolve(products);
      }).catch(err => {
        reject(err);
      });
    });
  },
  getProduct: function(id) {
    return new Promise((resolve, reject) => {
      models.product.findOne({
        where: {
          product_id: id
        }
      }).then(product => {
        resolve(product);
      }).catch(err => {
        reject(err);
      });
    });
  },
  createProduct: function(product) {
    return new Promise(async (resolve, reject) => {
      models.product.create(product, { returning: true });
    }).then(product => {
      resolve(product);
    }).catch(err => {
      reject(err);
    });
  }
};
