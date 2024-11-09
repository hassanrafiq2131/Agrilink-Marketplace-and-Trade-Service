const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

// Import routes
const { dummyRoutes /*, dummyRoutes2, dummyRoutes3 */ } = require("./routes");

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(cors({ origin: true, credentials: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/dummy", dummyRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Marketplace and Trade Microservice");
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
