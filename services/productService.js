require('dotenv').config()
var cloudinary = require('cloudinary').v2
let streamifier = require('streamifier')
const ProductDAO = require('../daos/productDAO')

cloudinary.config({
  cloud_name: process.env.CLN_CLOUD_NAME,
  api_key: process.env.CLN_API_KEY,
  api_secret: process.env.CLN_API_SECRET
})

function uploadPhoto(photo) {
 return new Promise((resolve, reject) => {
  let uploadStream = cloudinary.uploader.upload_stream(
    { folder: "pizzas" },
    function(error, result) {
      if (result) {
        resolve(result.secure_url);
      } else {
        reject(error);
      }
    }
  );

  streamifier.createReadStream(photo.data).pipe(uploadStream);
 });
}

class ProductService {
  static async getProducts() {
    return await ProductDAO.getProducts();
  }

  static async getProduct(id) {
    return await ProductDAO.getProduct(id);
  }

  static async createProduct(product, photo) {
    product.photo_url = await uploadPhoto(photo);
    const savedProduct = await ProductDAO.createProduct(product);
    return savedProduct.product_id;
  }

  static async editProduct(id, product, photo) {
    product.photo_url = await uploadPhoto(photo);
    const savedProduct = await ProductDAO.updateProduct(product);
    return savedProduct.product_id;
  }

  static async deleteProduct(id) {
    return await ProductDAO.deleteProduct(id);
  }
}

module.exports = ProductService;
