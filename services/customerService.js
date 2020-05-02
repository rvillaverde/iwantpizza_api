const CustomerDAO = require('../daos/customerDAO')

class CustomerService {
  static async getCustomers() {
    return await CustomerDAO.getCustomers();
  }

  static async getCustomer(id) {
    return await CustomerDAO.getCustomer(id);
  }

  static async createCustomer(customer) {
    const savedCustomer = await CustomerDAO.create(customer, { returning: true });
    return savedCustomer.getDataValue('customer_id');
  }
}

module.exports = CustomerService;
