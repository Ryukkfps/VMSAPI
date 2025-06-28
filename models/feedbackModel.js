const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Feedback schema to match the frontend form
const feedbackSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  suggestion: {
    type: String,
    required: true
  },
  image: {
    type: String, // Store image URI or file path
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Block model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;