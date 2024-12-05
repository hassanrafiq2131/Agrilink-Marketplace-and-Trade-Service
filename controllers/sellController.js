const Product = require('../models/Product');

// Add New Product (Sell Product)
exports.addProduct = async (req, res) => {
  const { sellerId } = req.params;
  const { itemId, name, category, description, price, quantity, location, attributes } = req.body;

  try {
    const newProduct = new Product({
      itemId,
      name,
      category,
      description,
      price,
      quantity,
      location,
      sellerId,
      attributes
    });
    await newProduct.save();
    res.status(201).json({ message: 'Product successfully added', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product', error: err });
  }
};

// Update Existing Product
exports.updateProduct = async (req, res) => {
  const { sellerId, itemId } = req.params;
  const { name, category, description, price, quantity, location, attributes } = req.body;

  try {
    const product = await Product.findOne({ itemId, sellerId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }
    product.name = name || product.name;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.location = location || product.location;
    product.attributes = attributes || product.attributes;
    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err });
  }
};

// Remove Product from Seller's Listing
exports.removeProduct = async (req, res) => {
  const { sellerId, itemId } = req.params;

  try {
    const product = await Product.findOne({ itemId, sellerId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }
    await Product.deleteOne({ itemId, sellerId });
    res.json({ message: 'Product removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing product', error: err });
  }
};

// View All Available Products in the Marketplace
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
};

// View Only Seller's Products
exports.getSellerProducts = async (req, res) => {
  const { sellerId } = req.params;

  try {
    const products = await Product.find({ sellerId });
    if (!products) {
      return res.status(404).json({ message: 'No products found for this seller' });
    }
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching seller products', error: err });
  }
};

// View Specific Product by itemId
exports.getProductById = async (req, res) => {
  const { itemId } = req.params;

  try {
    const product = await Product.findOne({ itemId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err });
  }
};

// Mark a Product as Available or Out of Stock
exports.updateAvailability = async (req, res) => {
  const { sellerId, itemId } = req.params;
  const { quantity } = req.body;

  try {
    const product = await Product.findOne({ itemId, sellerId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }
    product.quantity = quantity;
    await product.save();
    res.json({ message: 'Product availability updated successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product availability', error: err });
  }
};

// Search Products by Category or Name
exports.searchProducts = async (req, res) => {
  const { category, name } = req.query;

  try {
    let searchQuery = {};
    if (category) searchQuery.category = new RegExp(category, 'i');
    if (name) searchQuery.name = new RegExp(name, 'i');

    const products = await Product.find(searchQuery);
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found matching the search criteria' });
    }
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error searching products', error: err });
  }
};
