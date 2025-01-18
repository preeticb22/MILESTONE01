const express = require('express');
const Food = require('../models/food');
const router = express.Router();

// Route to get all food items
router.get('/api/foods', async (req, res) => {
  try {
    const foods = await Food.find(); // Fetch all food items from the database
    res.status(200).json(foods); // Return the food items as JSON
  } catch (error) {
    console.error('Error fetching foods:', error); // Log the error for debugging
    res.status(500).json({ error: 'Unable to fetch foods', details: error.message });
  }
});

// Route to add a food item
router.post('/api/foods', async (req, res) => {
  const { name, price } = req.body;

  console.log('Adding new food item:', req.body); // Log the incoming request body for debugging

  // Validate that both name and price are provided and price is a number
  if (!name || typeof price !== 'number') {
    return res.status(400).json({ error: 'Both name and price (as a number) are required' });
  }

  try {
    const newFood = new Food({ name, price }); // Create a new food item
    await newFood.save(); // Save the food item to the database
    res.status(201).json({
      message: 'Food item added successfully',
      food: newFood,
    });
  } catch (error) {
    console.error('Error adding food item:', error); // Log the error for debugging
    res.status(500).json({ error: 'Unable to add food item', details: error.message });
  }
});

// Route to delete a food item by ID
router.delete('/api/foods/:id', async (req, res) => {
  const { id } = req.params;

  console.log(`Attempting to delete food item with ID: ${id}`); // Log the food item ID to be deleted

  try {
    const deletedFood = await Food.findByIdAndDelete(id); // Attempt to delete the food item by its ID

    if (!deletedFood) {
      return res.status(404).json({ error: 'Food item not found' }); // Return error if no food item is found by the ID
    }

    res.status(200).json({
      message: 'Food item deleted successfully',
      food: deletedFood,
    });
  } catch (error) {
    console.error('Error deleting food item:', error); // Log the error for debugging
    res.status(500).json({ error: 'Unable to delete food item', details: error.message });
  }
});

module.exports = router;
