//const express = require("express");
//const router = express.Router();
//const { dummyController /* , dummyController2, dummyController3 */ } = require("../controllers");
//const { authMiddleware /* , middleware2, middleware3 */ } = require("../middlewares");

// router.use(authMiddleware.verifyToken, authMiddleware.verifyFarmer);
//router.get("/", dummyController.dummyFunction);

const express = require("express");
const router = express.Router();
const Product = require("../models/Products"); // Import the Product model
router.get("/", (req, res) => {
  res.send("Product route");
});

// Search Route
router.get("/search", async (req, res) => {
  try {
    const { name, category, priceRange } = req.query;

    // Define the search filter
    let filter = {};

    // Add search filters based on provided query parameters
    if (name) {
      filter.name = new RegExp(name, "i"); // Case-insensitive search on name
    }
    if (category) {
      filter.category = category;
    }
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-").map(Number);
      filter.price = { $gte: minPrice, $lte: maxPrice }; // Price range filter
    }

    // Find products that match the filter
    const products = await Product.find(filter);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error searching for products", error });
  }
});

module.exports = router;
