const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  City: {
    type: String,
    required: true
  },
  Country: {
    type: String,
    required: true
  },
  Short1: {
    type: String,
    required: true
  },
  Short2: {
    type: String,
    required: true
  },
});

// Create the Block model
const City = mongoose.model('City', CitySchema);

module.exports = City;