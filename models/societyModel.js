const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Society schema
const societySchema = new Schema({
  City: {
    type: String,
    required: true
  },
  SocietyName: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  NumberofBlocks: {
    type: Number,
    required: true
  },
  NumberofUnits: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Society model
const Society = mongoose.model('Society', societySchema);

module.exports = Society;
