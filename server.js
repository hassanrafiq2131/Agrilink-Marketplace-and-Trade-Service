
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const purchaseRoutes = require('./routes/purchaseRoutes');
const sellRoutes = require('./routes/sellRoutes'); // Include the seller routes

const productRoutes = require('./routes/productRoutes');



dotenv.config();

// Initialize Express app
const app = express();


// Middleware configurations
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Microservice')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Routes
app.use('/api', purchaseRoutes); // Purchase routes
app.use('/api', sellRoutes); // Seller routes (Add this line to enable testing seller routes)

app.use("/Products", productRoutes);

const routes = require("./routes/index");
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
