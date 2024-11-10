const express = require('express');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Purchase = require('../models/Purchase');
const router = express.Router();

// 1. View All Available Items
router.get('/items', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

// 2. Add Item to Cart
router.post('/cart/:userId/add', async (req, res) => {
  const { userId } = req.params;
  const { itemId, quantity } = req.body;

  try {
    const product = await Product.findOne({ itemId });
    if (!product) {
      return res.status(404).json({ message: 'Item not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the item is already in the cart
    const cartItem = cart.items.find((i) => i.productId.toString() === product._id.toString());
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.items.push({ productId: product._id, quantity });
    }

    await cart.save();
    res.json({ message: 'Item added to cart', cart: cart.items });
  } catch (err) {
    res.status(500).json({ message: 'Error adding item to cart', error: err });
  }
});

// 3. View Cart
router.get('/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err });
  }
});

// 4. Remove Item from Cart
router.delete('/cart/:userId/remove', async (req, res) => {
  const { userId } = req.params;
  const { itemId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    cart.items = cart.items.filter((i) => i.productId.toString() !== itemId);
    await cart.save();

    res.json({ message: 'Item removed from cart', cart: cart.items });
  } catch (err) {
    res.status(500).json({ message: 'Error removing item from cart', error: err });
  }
});

// 5. Clear Cart
router.delete('/cart/:userId/clear', async (req, res) => {
  const { userId } = req.params;
  try {
    await Cart.findOneAndDelete({ userId });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Error clearing cart', error: err });
  }
});

// 6. Complete Purchase
router.post('/purchase/:userId/complete', async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total
    let totalAmount = 0;
    const purchaseItems = cart.items.map((item) => {
      const total = item.productId.price * item.quantity;
      totalAmount += total;
      return { productId: item.productId._id, quantity: item.quantity, total };
    });

    const purchase = new Purchase({ userId, items: purchaseItems, totalAmount });
    await purchase.save();

    // Clear the cart after purchase
    await Cart.findOneAndDelete({ userId });

    res.json({ message: 'Purchase completed', purchase });
  } catch (err) {
    res.status(500).json({ message: 'Error completing purchase', error: err });
  }
});

// 7. View Purchase History
router.get('/purchase/:userId/history', async (req, res) => {
  const { userId } = req.params;
  try {
    const purchases = await Purchase.find({ userId }).populate('items.productId');
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching purchase history', error: err });
  }
});

module.exports = router;
