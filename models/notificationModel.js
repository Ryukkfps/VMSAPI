const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  requestId: {
    type: Schema.Types.ObjectId,
    ref: 'PermitRequest',
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
  }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
