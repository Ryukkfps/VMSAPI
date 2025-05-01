const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },
  Phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
  },
  fcmToken: {
    type: String
  },
  RoleId: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
