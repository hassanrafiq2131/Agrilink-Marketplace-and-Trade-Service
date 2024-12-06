const express = require('express');
const router = express.Router();
const productListingController = require('../controllers/productListingController');

// Route to get all products
router.get('/products', productListingController.getAllProducts);

module.exports = router;
