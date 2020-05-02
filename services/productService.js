const ProductDAO = require('../daos/productDAO')

class ProductService {
  static async getProducts() {
    return await ProductDAO.getProducts();
  }

  static async getProduct(id) {
    return await ProductDAO.getProduct(id);
  }
}

module.exports = ProductService;
