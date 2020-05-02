require('dotenv').config()

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const Model = Sequelize.Model;

const config = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
}

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

class Product extends Model {}
Product.init({
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  price: {
    type: DataTypes.INTEGER
  },
  photo_url: { 
    type: DataTypes.STRING
  }
}, {
  sequelize,
  freezeTableName: true,
  modelName: 'product'
});

class Customer extends Model {}
Customer.init({
  customer_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
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
  sequelize,
  freezeTableName: true,
  modelName: 'customer'
});


class Order extends Model {}
Order.init({
  order_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  subtotal: {
    type: Sequelize.INTEGER
  },
  shipping_fee: {
    type: Sequelize.INTEGER
  }
}, {
  sequelize,
  modelName: 'order'
});

class OrderProduct extends Model {}
OrderProduct.init({
  quantity: {
    type: Sequelize.INTEGER
  }
}, {
  sequelize,
  freezeTableName: true,
  modelName: 'order_product'
});

Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: 'product_id'
});

Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: 'order_id'
});

Order.hasOne(Customer, { foreignKey: 'customer_id' })
Order.belongsTo(Customer, { foreignKey: 'customer_id' });

exports.customer = Customer;
exports.product = Product;
exports.order = Order;
exports.orderProduct = OrderProduct;
exports.sequelize = sequelize;
