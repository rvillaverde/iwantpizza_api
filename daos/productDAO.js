const models  = require('../models');

module.exports = {
  getProducts: function() {
    return new Promise((resolve, reject) => {
      models.product.findAll({
        order: [
          ['price', 'ASC'],
        ]
      }).then(products => {
        resolve(products);
      }).catch(err => {
        reject(err);
      });
    });
  },
  getProduct: function(id) {
    return new Promise((resolve, reject) => {
      models.product.findByPk(id).then(product => {
        resolve(product);
      }).catch(err => {
        reject(err);
      });
    });
  },
  createProduct: function(product) {
    return new Promise(async (resolve, reject) => {
      models.product.create(product).then(product => {
        resolve(product);
      }).catch(err => {
        reject(err);
      });
    });
  },
  deleteProduct: function(id) {
    return new Promise(async (resolve, reject) => {
      models.product.destroy({
        where: { product_id: id }
      }).then(deleted => {
        resolve(deleted);
      }).catch(err => {
        reject(err);
      });
    });
  }
};
