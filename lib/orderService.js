const sequelize = require('./sequelize')

class OrderService {
  static async getOrders() {
    let orders = await sequelize.order.findAll({
      include: [ sequelize.customer, { model: sequelize.product,
        through: {
          model: sequelize.orderProduct,
          as: 'order_product',
          attributes: ['quantity'],
        }
       }]
    });
    return orders;
  }

  static async getOrder(id) {
    let order = await sequelize.order.findOne({
      include: [ sequelize.customer, { model: sequelize.product,
        through: {
          model: sequelize.orderProduct,
          as: 'order_product',
          attributes: ['quantity'],
        },
       }
      ],
      where: {
        order_id: id
      }
    });
    return order;
  }

  static async createOrder(order, items) {
    order.subtotal = items.reduce((total, item) => (item.price * item.quantity + total), 0);
    const savedOrder = await sequelize.order.create(order, { returning: true });

    let orderProducts = [];
    items.forEach(async (item) => {
      orderProducts.push({
        order_id: savedOrder.getDataValue('order_id'),
        product_id: item.id,
        quantity: item.quantity,
      });
    });
    const savedOrderProducts = await sequelize.orderProduct.bulkCreate(orderProducts, { returning: true });

    return savedOrder.getDataValue('order_id');
  }
}

module.exports = OrderService;
