const db = require('./db')
const escape = require('sql-template-strings')

class ProductService {
  static async getProducts() {
    let page = 1
    const limit = 9
    if (page < 1) page = 1
    const products = await db.query(escape`
        SELECT *
        FROM product
        ORDER BY price
        LIMIT ${(page - 1) * limit}, ${limit}
      `)
  /*  const count = await db.query(escape`
        SELECT COUNT(*)
        AS profilesCount
        FROM profiles
      `)*/
    return JSON.stringify(products);
  }

  static async getProduct(id) {
    const products = await db.query(escape`
        SELECT *
        FROM product
        WHERE id = ${ id }
        LIMIT 1
      `)
    return JSON.stringify(products[0]);
  }
}

module.exports = ProductService;
