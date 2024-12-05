const express = require('express');
const sellController = require('../controllers/sellController');
const router = express.Router();

// Routes for Seller Actions
router.post('/seller/:sellerId/product', sellController.addProduct);
router.put('/seller/:sellerId/product/:itemId', sellController.updateProduct);
router.delete('/seller/:sellerId/product/:itemId', sellController.removeProduct);
router.put('/seller/:sellerId/product/:itemId/availability', sellController.updateAvailability);
router.get('/seller/:sellerId/products', sellController.getSellerProducts);

// Routes for Marketplace
router.get('/products', sellController.getAllProducts);
router.get('/product/:itemId', sellController.getProductById);
router.get('/products/search', sellController.searchProducts);

module.exports = router;
