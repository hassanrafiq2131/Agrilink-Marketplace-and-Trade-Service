//const express = require("express");
//const router = express.Router();
//const { dummyController /* , dummyController2, dummyController3 */ } = require("../controllers");
//const { authMiddleware /* , middleware2, middleware3 */ } = require("../middlewares");

// router.use(authMiddleware.verifyToken, authMiddleware.verifyFarmer);
//router.get("/", dummyController.dummyFunction);

module.exports = router;
const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // Ensure Product schema/model is set up in /models

// Search route to find products based on criteria
router.get("/search", async (req, res) => {
  const { type, priceRange, location, availability } = req.query;
  const filter = {};

  // Build dynamic filter based on query params
  if (type) filter.type = type;
  if (location) filter.location = location;
  if (availability) filter.availability = availability;
  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split("-");
    filter.price = { $gte: minPrice, $lte: maxPrice };
  }

  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

module.exports = router;
