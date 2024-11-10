const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  itemId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  sellerId: { type: String, required: true },
  attributes: {
    breed: { type: String },
    age: { type: Number },
    weight: { type: Number },
    healthStatus: { type: String }
  }
});

module.exports = mongoose.model('Product', productSchema);
