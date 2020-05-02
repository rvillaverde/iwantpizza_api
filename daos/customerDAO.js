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
      models.customer.findOne({
        where: {
          customer_id: id
        }
      }).then(customer => {
        resolve(customer);
      }).catch(err => {
        reject(err);
      });
    });
  },
  createCustomer: function(customer) {
    return new Promise(async (resolve, reject) => {
      models.customer.create(customer, { returning: true });
    }).then(customer => {
      resolve(customer);
    }).catch(err => {
      reject(err);
    });
  }
};
