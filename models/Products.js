const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: String,
  name: String,
  category: String,
  description: String,
  price: Number,
  quantity: Number,
  location: String,
  sellerId: String,
  attributes: {
    breed: String,
    age: Number,
    weight: Number,
    healthStatus: String,
  }
});

module.exports = mongoose.model("Product", productSchema);
