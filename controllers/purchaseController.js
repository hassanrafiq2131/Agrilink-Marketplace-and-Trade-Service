const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Purchase = require('../models/Purchase');

// Controller for viewing all available items
exports.viewItems = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
};

// Controller for adding an item to the cart
exports.addToCart = async (req, res) => {
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
};

// Controller for viewing the cart
exports.viewCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err });
  }
};

// Controller for removing an item from the cart
exports.removeFromCart = async (req, res) => {
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
};

// Controller for clearing the cart
exports.clearCart = async (req, res) => {
  const { userId } = req.params;
  try {
    await Cart.findOneAndDelete({ userId });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Error clearing cart', error: err });
  }
};

// Controller for completing a purchase
exports.completePurchase = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalAmount = 0;
    const purchaseItems = cart.items.map((item) => {
      const total = item.productId.price * item.quantity;
      totalAmount += total;
      return { productId: item.productId._id, quantity: item.quantity, total };
    });

    const purchase = new Purchase({ userId, items: purchaseItems, totalAmount });
    await purchase.save();

    await Cart.findOneAndDelete({ userId });

    res.json({ message: 'Purchase completed', purchase });
  } catch (err) {
    res.status(500).json({ message: 'Error completing purchase', error: err });
  }
};

// Controller for viewing purchase history
exports.viewPurchaseHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const purchases = await Purchase.find({ userId }).populate('items.productId');
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching purchase history', error: err });
  }
};
