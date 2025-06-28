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
    // First fetch the notifications with their original isViewed state
    const notifications = await Notification.find({ userId: req.params.userId });
    
    // Send the original notifications to the client
    res.status(200).send(notifications);
    
    // Then update all unviewed notifications to mark them as viewed (after response is sent)
    if (notifications.length > 0) {
      await Notification.updateMany(
        { userId: req.params.userId, isViewed: false },
        { $set: { isViewed: true } }
      );
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update the status of a notification
exports.updateNotificationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    
    // Update status if provided
    if (status && status !== notification.status) {
      notification.status = status;
    }
    
    const updatedNotification = await notification.save();
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getAllNotificationsByUseridUnviewed = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId , isViewed: false });

    const count = notifications.length;
    res.status(200).send(count);
  } catch (error) {
    res.status(500).send(error.message);
  }
};