const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Route to search products by name with sorting and pagination
router.get("/search/name", async (req, res) => {
  try {
    const { name, sortBy = "price", order = "asc", page = 1, limit = 10 } = req.query;

    // Define filter for name search
    const filter = name ? { name: new RegExp(name, "i") } : {};

    // Sorting options
    const sort = { [sortBy]: order === "desc" ? -1 : 1 };

    // Pagination
    const skip = (page - 1) * limit;

    // Query and pagination
    const products = await Product.find(filter).sort(sort).skip(skip).limit(Number(limit));
    const totalCount = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: "Error searching for products by name", error });
  }
});

// Route to search products by item ID
router.get("/search/id", async (req, res) => {
  try {
    const { itemId } = req.query;

    // Find product by item ID
    const product = await Product.findOne({ itemId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error searching for product by ID", error });
  }
});

// Route to search products by seller ID
router.get("/search/seller", async (req, res) => {
  try {
    const { sellerId, page = 1, limit = 10 } = req.query;

    // Find products by seller ID with pagination
    const filter = sellerId ? { sellerId } : {};
    const skip = (page - 1) * limit;
    const products = await Product.find(filter).skip(skip).limit(Number(limit));
    const totalCount = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: "Error searching for products by seller ID", error });
  }
});

// Route to search products by price range
router.get("/search/price", async (req, res) => {
  try {
    const { minPrice, maxPrice, sortBy = "price", order = "asc", page = 1, limit = 10 } = req.query;

    // Define filter for price range
    const filter = {
      price: { $gte: Number(minPrice) || 0, $lte: Number(maxPrice) || Infinity }
    };

    // Sorting and pagination
    const sort = { [sortBy]: order === "desc" ? -1 : 1 };
    const skip = (page - 1) * limit;

    const products = await Product.find(filter).sort(sort).skip(skip).limit(Number(limit));
    const totalCount = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: "Error searching for products by price range", error });
  }
});

module.exports = router;
