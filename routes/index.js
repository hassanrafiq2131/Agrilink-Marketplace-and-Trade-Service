//const dummyRoutes = require("./productRoutes");
// add more routes here



const express = require("express");
const router = express.Router();

const productRoutes = require("./productRoutes"); // Match the case here if it's "ProductRoutes.js"
const productListingRoutes = require("./productListingRoute");



// Use product routes for `/products` endpoints
router.use("/Products", productRoutes);
router.use("/products", productListingRoutes); 


module.exports = router;


//module.exports = {
  //dummyRoutes,
  // export more routes here
//};
