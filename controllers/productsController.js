import db from '../models/index.js';
const { Product } = db;

const productsController = {
  getAllProducts: async (req, res) => {
    const products = await Product.findAll();
    res.status(200).json(products);
  },
  getProductById: async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  }
};

export default productsController;