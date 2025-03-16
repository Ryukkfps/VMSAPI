const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Home schema
const homeSchema = new Schema({
  UserId: {
    type: Number,
    required: true
  },
  SId: {
    type: Schema.Types.ObjectId,
    ref: 'Society',
    required: true
  },
  BId: {
    type: Schema.Types.ObjectId,
    ref: 'Block',
    required: true
  },
  UId: {
    type: Schema.Types.ObjectId,
    ref: 'Unit',
    required: true
  },
  OwnershipType: {
    type: Schema.Types.ObjectId,
    ref: 'OwnershipType',
    required: true
  },
  OccupancyStatus: {
    type: Schema.Types.ObjectId,
    ref: 'OccupancyStatus',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Home model
const Home = mongoose.model('Home', homeSchema);

module.exports = Home;
