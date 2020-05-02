module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define('product', {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    },
    photo_url: { 
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true
  });

  return Product;
}
