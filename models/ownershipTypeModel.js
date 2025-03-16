const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the OwnershipType schema
const ownershipTypeSchema = new Schema({
  TypeName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the OwnershipType model
const OwnershipType = mongoose.model('OwnershipType', ownershipTypeSchema);

module.exports = OwnershipType;
