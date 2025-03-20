const mongoose = require('mongoose');
const OwnershipType = require('./ownershipTypeModel');
const Schema = mongoose.Schema;

// Define the OccupancyStatus schema
const occupancyStatusSchema = new Schema({
  OSName: {
    type: String,
    required: true
  },
  OTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'OwnershipType',
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
