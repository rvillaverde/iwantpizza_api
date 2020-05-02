module.exports = function(sequelize, DataTypes) {
  const Customer = sequelize.define('customer', {
    customer_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    address_line_1: { 
      type: DataTypes.STRING
    },
    address_line_2: { 
      type: DataTypes.STRING
    },
    postal_code: { 
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true
  });

  return Customer;
}
