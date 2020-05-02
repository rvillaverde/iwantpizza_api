const OrderDAO = require('../daos/orderDAO')

class OrderService {
  static async getOrders() {
    return await OrderDAO.getOrders();
  }

  static async getOrder(id) {
    return await OrderDAO.getOrder(id);
  }

  static async createOrder(order, items) {
    order.subtotal = items.reduce((total, item) => (item.price * item.quantity + total), 0);
    const savedOrder = await OrderDAO.createOrder(order, items);
    return savedOrder.getDataValue('order_id');
  }
}

module.exports = OrderService;
