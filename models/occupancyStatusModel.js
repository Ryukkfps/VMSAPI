const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the OccupancyStatus schema
const occupancyStatusSchema = new Schema({
  OSName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the OccupancyStatus model
const OccupancyStatus = mongoose.model('OccupancyStatus', occupancyStatusSchema);

module.exports = OccupancyStatus;
