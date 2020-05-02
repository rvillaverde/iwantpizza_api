const models  = require('../models');

module.exports = {
  getOrders: function() {
    return new Promise((resolve, reject) => {
      models.order.findAll({
        include: [ models.customer, { model: models.product,
          through: {
            model: models.order_product,
            as: 'order_product',
            attributes: ['quantity'],
          }
         }]
      }).then(orders => {
        resolve(orders);
      }).catch(err => {
        reject(err);
      });
    });
  },
  getOrder: function(id) {
    return new Promise((resolve, reject) => {
      models.order.findOne({
        include: [ models.customer, { model: models.product,
          through: {
            model: models.order_product,
            as: 'order_product',
            attributes: ['quantity'],
          }
         }
        ],
        where: {
          order_id: id
        }
      }).then(order => {
        resolve(order);
      }).catch(err => {
        reject(err);
      });
    });
  },
  createOrder: async function(order, items) {
    const savedOrder = await models.order.create(order, { returning: true });
    let orderProducts = [];
    items.forEach(async (item) => {
      orderProducts.push({
        order_id: savedOrder.getDataValue('order_id'),
        product_id: item.id,
        quantity: item.quantity,
      });
    });
    await models.order_product.bulkCreate(orderProducts, { returning: true });
    return savedOrder;
  }
};
