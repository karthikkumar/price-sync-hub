const Product = require('../models/product');

const updateProduct = async (req, res) => {
    const sku = req.params.sku;
    const { name, price } = req.body;
  
    try {
      const product = await Product.findOne({ where: { sku } });
  
      if (product) {
        if (name) product.name = name;
        if (price) product.price = price;
  
        await product.save();
        res.json({ message: 'Product updated successfully', product });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = updateProduct;