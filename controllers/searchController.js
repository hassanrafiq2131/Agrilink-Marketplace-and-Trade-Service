const Product = require('../models/Product'); // Import the Product model

const searchProducts = async (req, res) => {
  const { query, name, category, minPrice, maxPrice } = req.query;

  try {
    // Build the search filter object
    const searchFilter = {};

    // Filter by name if provided
    if (name) {
      searchFilter.name = { $regex: name, $options: 'i' }; // Case-insensitive regex
    }

    // Filter by category if provided
    if (category) {
      searchFilter.category = category;
    }

    // Filter by price range if provided
    if (minPrice || maxPrice) {
      searchFilter.price = {};
      if (minPrice) searchFilter.price.$gte = parseFloat(minPrice); // Greater than or equal to minPrice
      if (maxPrice) searchFilter.price.$lte = parseFloat(maxPrice); // Less than or equal to maxPrice
    }

    // General query (search in name, description, or category)
    if (query) {
      searchFilter.$or = [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive search in name
        { description: { $regex: query, $options: 'i' } }, // Case-insensitive search in description
        { category: { $regex: query, $options: 'i' } }, // Case-insensitive search in category
      ];
    }

    // Fetch the filtered products from the database
    const products = await Product.find(searchFilter);

    // Check if any products match the criteria
    if (!products.length) {
      return res.status(404).json({ message: 'No products found matching the search criteria' });
    }

    // Send the filtered results
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error searching products', error: err });
  }
};

module.exports = {
  searchProducts,
};
