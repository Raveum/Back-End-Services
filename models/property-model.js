const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  capRate: {
    type: Number,
    required: true,
  },
  sharesAvailable: {
    type: Number,
    required: true,
  },
  rentalYield: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // URL to the image
    required: false,
  }
});

module.exports = mongoose.model('PropertyCard', propertySchema);
