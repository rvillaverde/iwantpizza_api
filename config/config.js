require('dotenv').config()

module.exports = {
  development: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: 'mysql',
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: 'mysql'
  }
};
