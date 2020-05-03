module.exports = function(sequelize, DataTypes) {
  const Order = sequelize.define('order', {
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    currency: {
      type: DataTypes.STRING
    },
    subtotal: {
      type: DataTypes.INTEGER
    },
    shipping_fee: {
      type: DataTypes.INTEGER
    }
  });

  Order.associate = function(models) {
    Order.belongsTo(models.customer, { 
      foreignKey: 'customer_id',
      onDelete: "CASCADE"
    });

    models.product.belongsToMany(Order, {
      through: sequelize.models.order_product,
      foreignKey: 'product_id',
      onDelete: "CASCADE"
    });

    Order.belongsToMany(models.product, {
      through: sequelize.models.order_product,
      foreignKey: 'order_id',
      onDelete: "CASCADE"
    });
  }

  return Order;
}
