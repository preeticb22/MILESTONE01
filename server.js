try {
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const foodRoutes = require('./routes/foodRoutes');  // Import the food routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // Middleware to parse JSON requests

// MongoDB URI
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/foodDelivery';

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

// Use the food routes
app.use(foodRoutes);  // Mount the food routes at the root level

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
} catch (err) {
    console.error(err);
}