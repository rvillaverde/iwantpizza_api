module.exports = function(sequelize, DataTypes) {
  const OrderProduct = sequelize.define('order_product', {
    quantity: {
      type: DataTypes.INTEGER
    }
  },
  {
    freezeTableName: true
  });

  return OrderProduct;
}

