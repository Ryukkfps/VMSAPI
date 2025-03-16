const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Block schema
const blockSchema = new Schema({
  BlockName: {
    type: String,
    required: true
  },
  SId: {
    type: Schema.Types.ObjectId,
    ref: 'Society',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Block model
const Block = mongoose.model('Block', blockSchema);

module.exports = Block;