const sequelize = require('./sequelize')

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

class ProductService {
  static async getProducts() {
    let products = await sequelize.product.findAll();
    return products;
  }

  static async getProduct(id) {
    let product = await sequelize.product.findOne({
      where: {
        product_id: id
      }
    });
    return product;
  }
}

module.exports = ProductService;
