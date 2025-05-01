const Notification = require('../models/notificationModel');

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).send(notification);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAllNotificationsByUserid = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId });
    res.status(200).send(notifications);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update the status of a notification
exports.updateNotificationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const notification = await Notification.findByIdAndUpdate(id, { status }, { new: true });
    if (!notification) {
      return res.status(404).send('Notification not found');
    }
    res.status(200).send(notification);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
