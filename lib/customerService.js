const sequelize = require('./sequelize')

class CustomerService {
  static async getCustomers(ids) {
    return await sequelize.customer.findAll();
  }

  static async getCustomer(id) {
    return await sequelize.customer.findOne({
      where: {
        customer_id: id
      }
    });
  }

  static async createCustomer(customer) {
    const savedCustomer = await sequelize.customer.create(customer, { returning: true });
    return savedCustomer.getDataValue('customer_id');
  }
}

module.exports = CustomerService;
