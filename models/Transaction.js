const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transactionId: String,
  buyerId: String,
  sellerId: String,
  productId: String,
  quantity: Number,
  totalPrice: Number,
  transactionDate: String,
  status: String,
});

module.exports = mongoose.model("Transaction", transactionSchema);
