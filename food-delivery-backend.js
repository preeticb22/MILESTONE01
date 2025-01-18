const express = require('express'); // Import express
const mongoose = require('mongoose'); // Import mongoose
require('dotenv').config(); // Load environment variables

const app = express(); // Create an instance of express
const PORT = process.env.PORT || 3000; // Set the port

// Middleware
app.use(express.json()); // Parse JSON requests

// MongoDB URI
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/foodDelivery';

// Connect to MongoDB
mongoose.connect(mongoURI)

  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

// Define a schema and model for example purposes
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});
const Food = mongoose.model('Food', foodSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Food Delivery Backend!'); // Root endpoint
});

// Route to get all foods
app.get('/api/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch foods' });
  }
});

// Route to add a food item
app.post('/api/foods', async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  try {
    const newFood = new Food({ name, price });
    await newFood.save();
    res.status(201).json({ message: 'Food item added successfully', food: newFood });
  } catch (error) {
    res.status(500).json({ error: 'Unable to add food item' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
