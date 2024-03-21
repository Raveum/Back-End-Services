const express = require('express');
const router = express.Router();
const PropertyCard = require('../models/property-model');

// Create a new property card
router.post('/', async (req, res) => {
  const propertyCard = new PropertyCard(req.body);
  try {
    const newPropertyCard = await propertyCard.save();
    res.status(201).json(newPropertyCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all property cards
router.get('/', async (req, res) => {
  try {
    const propertyCards = await PropertyCard.find();
    res.json(propertyCards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single property card by ID
router.get('/:id', async (req, res) => {
  try {
    const propertyCard = await PropertyCard.findById(req.params.id);
    if (!propertyCard) {
      return res.status(404).json({ message: "Property card not found" });
    }
    res.json(propertyCard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a property card
router.patch('/:id', async (req, res) => {
  try {
    const propertyCard = await PropertyCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!propertyCard) {
      return res.status(404).json({ message: "Property card not found" });
    }
    res.json(propertyCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a property card
router.delete('/:id', async (req, res) => {
  try {
    const propertyCard = await PropertyCard.findByIdAndDelete(req.params.id);
    if (!propertyCard) {
      return res.status(404).json({ message: "Property card not found" });
    }
    res.json({ message: "Property card deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
