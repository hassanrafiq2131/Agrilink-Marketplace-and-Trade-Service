const express = require('express');
const router = express.Router();
const { searchProducts } = require('../controllers/searchController'); // Import the controller

// Define the search route
router.get('/search', searchProducts);

module.exports = router;
