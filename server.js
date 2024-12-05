
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/index"); 

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// Check if Mongo URI is loaded


// Connect to MongoDB

 mongoose.connect("mongodb://localhost:27017/Microservice", {

  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected successfully!");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Routes
const productRoutes = require("./routes/productRoutes");
app.use('/api', productRoutes);
const searchRoutes = require('./routes/searchRoutes');
app.use('/api', searchRoutes);
const productListingRoutes = require("./routes/productListingRoute"); // Product listing route
app.use('/api/products', productListingRoutes); // Product listing
const purchaseRoute = require('./routes/purchaseRoutes');
app.use('/api', purchaseRoute); // Product listing

const productRoutes = require("./routes/productRoutes.js");
//const productRoutes = require("C:\Users\OGDCL\Desktop\Agrilink\Agrilink-Marketplace-and-Trade-Service\routes\productRoutes.js");

app.use("/Products", productRoutes);


app.use("/", routes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Marketplace and Trade Microservice");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// Check if Mongo URI is loaded
//console.log("Mongo URI:", process.env.MONGO_URI);

// Connect to MongoDB
/*mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected successfully!");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});*/

// Routes
//const productRoutes = require("./routes/productRoutes");
//app.use('/api', productRoutes);