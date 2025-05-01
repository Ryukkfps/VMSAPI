const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/', notificationController.createNotification);
router.patch('/status', notificationController.updateNotificationStatus);
router.get('/user/:userId', notificationController.getAllNotificationsByUserid);

module.exports = router;
