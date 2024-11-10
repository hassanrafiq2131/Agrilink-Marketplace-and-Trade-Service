const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const purchaseRoutes = require('./routes/purchaseRoutes');
const sellRoutes = require('./routes/sellRoutes'); // Include the seller routes

dotenv.config();

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

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
