const models  = require('../models');

module.exports = {
  getOrders: function() {
    return new Promise((resolve, reject) => {
      models.order.findAll({
        include: [ models.customer, { model: models.product,
          through: {
            model: models.order_product,
            as: 'order_product',
            attributes: ['quantity', 'price'],
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
      models.order.findByPk(id, {
        include: [ models.customer, { model: models.product,
          through: {
            model: models.order_product,
            as: 'order_product',
            attributes: ['quantity', 'price'],
          }
         }
        ]
      }).then(order => {
        resolve(order);
      }).catch(err => {
        reject(err);
      });
    });
  },
  createOrder: async function(order, items) {
    const savedOrder = await models.order.create(order);
    let orderProducts = [];
    items.forEach(async (item) => {
      orderProducts.push({
        order_id: savedOrder.order_id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      });
    });
    await models.order_product.bulkCreate(orderProducts);
    return savedOrder;
  }
};
