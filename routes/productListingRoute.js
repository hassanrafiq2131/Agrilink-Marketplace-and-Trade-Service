const express = require('express');
const Product = require('../models/Product'); // Assuming Product schema is in models/Product.js
const router = express.Router();

// Route to Get All Products
router.get('/products', async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();
    
    // Respond with the list of products
    res.status(200).json({ products });
  } catch (err) {
    // Handle any errors during fetching
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
});

module.exports = router;
