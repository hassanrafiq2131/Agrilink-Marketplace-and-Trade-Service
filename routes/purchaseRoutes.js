const express = require('express');
const PurchaseController = require('../controllers/purchaseController');
const router = express.Router();

// Routes mapping to the PurchaseController functions
router.get('/items', PurchaseController.viewItems);
router.post('/cart/:userId/add', PurchaseController.addToCart);
router.get('/cart/:userId', PurchaseController.viewCart);
router.delete('/cart/:userId/remove', PurchaseController.removeFromCart);
router.delete('/cart/:userId/clear', PurchaseController.clearCart);
router.post('/purchase/:userId/complete', PurchaseController.completePurchase);
router.get('/purchase/:userId/history', PurchaseController.viewPurchaseHistory);

module.exports = router;
