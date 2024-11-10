//const dummyRoutes = require("./productRoutes");
// add more routes here



const express = require("express");
const router = express.Router();

const productRoutes = require("./ProductRoutes"); // Match the case here if it's "ProductRoutes.js"


// Use product routes for `/products` endpoints
router.use("/Products", productRoutes);

module.exports = router;


//module.exports = {
  //dummyRoutes,
  // export more routes here
//};
