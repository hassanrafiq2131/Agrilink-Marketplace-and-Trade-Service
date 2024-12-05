const Products = require('../models/Products');


// Controller function to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.find(); // Fetch all products from database
    res.status(200).json(products); // Respond with the list of products
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' }); // Handle errors 
  }
};
