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
  },
  createProduct: async (req, res) => {
    const { name, description, price, stock, imageUrl } = req.body;
    try {
      const newProduct = await Product.create({ name, description, price, stock, imageUrl });
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: 'Error creating product', error });
    }
  },
  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, imageUrl } = req.body;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      await product.update({ name, description, price, stock, imageUrl });
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: 'Error updating product', error });
    }
  },
  deleteProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      await product.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: 'Error deleting product', error });
    }
  }
};

export default productsController;