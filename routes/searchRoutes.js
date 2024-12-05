const express = require('express');
const router = express.Router();
const { products } = require('../data'); // Import the products from data.js

// Define the search route
router.get('/search', (req, res) => {
  const { query, name, category, minPrice, maxPrice } = req.query;

  // Initialize the filtered items with all products
  let filteredItems = products;

  // Filter by name if provided
  if (name) {
    filteredItems = filteredItems.filter(item =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filter by category if provided
  if (category) {
    filteredItems = filteredItems.filter(item =>
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by price range if provided
  if (minPrice) {
    filteredItems = filteredItems.filter(item => item.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    filteredItems = filteredItems.filter(item => item.price <= parseFloat(maxPrice));
  }

  // Filter by the general query term (search in name, description, or category)
  if (query) {
    filteredItems = filteredItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
  }
  console.log(filteredItems);
  // Send the filtered results
  res.json({ data: filteredItems});
});

module.exports = router;

