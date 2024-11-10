const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  role: String,
  location: String,
  contactNumber: String,
});

module.exports = mongoose.model("User", userSchema);
