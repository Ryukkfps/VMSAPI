const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  requestId: {
    type: Schema.Types.ObjectId,
    refPath: 'requestType', 
    required: true
  },
  requestType: {
    type: String,
    enum: ['permitRequest', 'homeRegistration'],
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  NotificationTitle: {
    type: String,
    required: true
  },
  NotificationBody: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isViewed: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending'
  }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
