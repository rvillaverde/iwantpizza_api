const models  = require('../models');

module.exports = {
  getCustomers: function() {
    return new Promise((resolve, reject) => {
      models.customer.findAll().then(customers => {
        resolve(customers);
      }).catch(err => {
        reject(err);
      });
    });
  },
  getCustomer: function(id) {
    return new Promise((resolve, reject) => {
      models.customer.findByPk(id).then(customer => {
        resolve(customer);
      }).catch(err => {
        reject(err);
      });
    });
  },
  createCustomer: function(customer) {
    return new Promise(async (resolve, reject) => {
      models.customer.create(customer).then(customer => {
        resolve(customer);
      }).catch(err => {
        reject(err);
      });
    });
  }
};
