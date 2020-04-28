const db = require('./db')
const escape = require('sql-template-strings')

const p = [
  { 
    "id":51,
    "name":"Mozzarella",
    "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "price":15,
    "photo_url":"https://res.cloudinary.com/ruminga/image/upload/v1587904949/pizzas/pizza-con-tomate-albahaca-y-mozzarella-1080x671_graq1u.jpg"
  },
  { 
    "id":52,
    "name":"Pepperoni",
    "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "price":18,
    "photo_url":"https://res.cloudinary.com/ruminga/image/upload/v1587904970/pizzas/Pizza-con-pepperoni_oizonx.jpg"
  },
  {
    "id":53,
    "name":"Fugazzeta",
    "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "price":18,
    "photo_url":"https://res.cloudinary.com/ruminga/image/upload/v1587867380/pizzas/fugazetta1-57bb81193df78c876338f907_kkxsrj.jpg"
  },
  {
    "id":54,
    "name":"Neapolitan",
    "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "price":22,
    "photo_url":"https://res.cloudinary.com/ruminga/image/upload/v1587869651/pizzas/receta-pizza-napolitana-original-locosxlapizza_vy7ux5.jpg"
  }
]

function buildOrQuery(field, values) {
  let query = ''
  values.forEach((value, i) => (
    query += `${ i === 0 ? 'WHERE' : 'OR'} ${ field } = ${ value } `
  ));
  return query;
}

class ProductService {
  static async getProducts(ids) {
    let page = 1
    const limit = 9
    const query = ids ? buildOrQuery('id', ids) : ''
    if (page < 1) page = 1
    const products = await db.query(`
        SELECT *
        FROM product
        ${ query }
        ORDER BY price
        LIMIT ${(page - 1) * limit}, ${limit}
      `)
    return JSON.stringify(products ? products : []);
  }

  static async getProduct(id) {
    const products = await db.query(`
        SELECT *
        FROM product
        WHERE id = ${ id }
        LIMIT 1
      `)
    return JSON.stringify(products ? products[0] : {});
  }
}

module.exports = ProductService;
