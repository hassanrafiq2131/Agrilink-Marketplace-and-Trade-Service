const express = require('express');
const Product = require('../models/Product'); 
const router = express.Router();

// 1. Add New Product (Sell Product)
router.post('/seller/:sellerId/product', async (req, res) => {
  const { sellerId } = req.params;
  const { itemId, name, category, description, price, quantity, location, attributes } = req.body;

  try {
    // Ensure the sellerId is valid (you can implement additional checks here if necessary)
    // Create a new product for the seller
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

    // Save the product to the database
    await newProduct.save();
    res.status(201).json({ message: 'Product successfully added', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product', error: err });
  }
});

// 2. Update Existing Product
router.put('/seller/:sellerId/product/:itemId', async (req, res) => {
  const { sellerId, itemId } = req.params;
  const { name, category, description, price, quantity, location, attributes } = req.body;

  try {
    // Find the product by itemId and ensure it belongs to the seller
    const product = await Product.findOne({ itemId, sellerId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    // Update the product details
    product.name = name || product.name;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.location = location || product.location;
    product.attributes = attributes || product.attributes;

    // Save the updated product
    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err });
  }
});

// 3. Remove Product from Seller's Listing
router.delete('/seller/:sellerId/product/:itemId', async (req, res) => {
  const { sellerId, itemId } = req.params;

  try {
    // Find the product by itemId and ensure it belongs to the seller
    const product = await Product.findOne({ itemId, sellerId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    // Remove the product
    await Product.deleteOne({ itemId, sellerId });
    res.json({ message: 'Product removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing product', error: err });
  }
});

// 4. View All Available Products in the Marketplace
router.get('/products', async (req, res) => {
  try {
    // Fetch all products in the marketplace
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

// 5. View Only Seller's Products
router.get('/seller/:sellerId/products', async (req, res) => {
  const { sellerId } = req.params;

  try {
    // Find all products belonging to the seller
    const products = await Product.find({ sellerId });
    if (!products) {
      return res.status(404).json({ message: 'No products found for this seller' });
    }
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching seller products', error: err });
  }
});

// 6. View Specific Product by itemId
router.get('/product/:itemId', async (req, res) => {
  const { itemId } = req.params;

  try {
    // Find product by itemId
    const product = await Product.findOne({ itemId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err });
  }
});

// 7. Mark a Product as Available or Out of Stock (update the quantity)
router.put('/seller/:sellerId/product/:itemId/availability', async (req, res) => {
  const { sellerId, itemId } = req.params;
  const { quantity } = req.body;

  try {
    // Find the product by itemId and ensure it belongs to the seller
    const product = await Product.findOne({ itemId, sellerId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    // Update the product's quantity to indicate availability
    product.quantity = quantity;
    await product.save();
    res.json({ message: 'Product availability updated successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product availability', error: err });
  }
});

// 8. Search Products by Category or Name
router.get('/products/search', async (req, res) => {
  const { category, name } = req.query;

  try {
    // Build query based on search parameters
    let searchQuery = {};
    if (category) searchQuery.category = new RegExp(category, 'i'); // Case insensitive search
    if (name) searchQuery.name = new RegExp(name, 'i'); // Case insensitive search

    const products = await Product.find(searchQuery);
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found matching the search criteria' });
    }
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error searching products', error: err });
  }
});

module.exports = router;
