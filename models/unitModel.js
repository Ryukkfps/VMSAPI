const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Unit schema
const unitSchema = new Schema({
  FlatNumber: {
    type: String,
    required: true
  },
  BlockId: {
    type: Schema.Types.ObjectId,
    ref: 'Block',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Unit model
const Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;
