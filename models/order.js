module.exports = function(sequelize, DataTypes) {
  const Order = sequelize.define('order', {
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    subtotal: {
      type: DataTypes.INTEGER
    },
    shipping_fee: {
      type: DataTypes.INTEGER
    }
  });

  Order.associate = function(models) {
    Order.hasOne(models.customer, { foreignKey: 'customer_id' })
    Order.belongsTo(models.customer, { foreignKey: 'customer_id' });

    models.product.belongsToMany(Order, {
      through: sequelize.models.order_product,
      foreignKey: 'product_id'
    });

    Order.belongsToMany(models.product, {
      through: sequelize.models.order_product,
      foreignKey: 'order_id'
    });
  }

  return Order;
}
