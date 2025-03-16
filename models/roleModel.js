const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Role schema
const roleSchema = new Schema({
  RoleName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Role model
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
