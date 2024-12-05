const express = require("express");
const router = express.Router();
const Product = require("../data.js");

router.get("/search", async (req, res) => {
  try {
    const {
      name,
      category,
      minPrice,
      maxPrice,
      sellerId,
      sortBy = "price",
      order = "asc",
      page = 1,
      limit = 10,
    } = req.query;

    // Define filters
    const filters = {};
    if (name) filters.name = new RegExp(name, "i"); // Case-insensitive search
    if (category) filters.category = category;
    if (minPrice) filters.price = { ...filters.price, $gte: parseFloat(minPrice) };
    if (maxPrice) filters.price = { ...filters.price, $lte: parseFloat(maxPrice) };
    if (sellerId) filters.sellerId = sellerId;

    // Sorting and pagination
    const sort = { [sortBy]: order === "desc" ? -1 : 1 };
    const skip = (page - 1) * limit;

    // Query products
    // const products = await Product.find(filters).sort(sort).skip(skip).limit(Number(limit));
    // const totalCount = await Product.countDocuments(filters);
    console.log(Product);

    res.status(200).json({
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Error searching for products", error });
  }
});

module.exports = router;
