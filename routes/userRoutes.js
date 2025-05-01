const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Create a new user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get all admin users
router.get('/admins', userController.getAllAdmins);

// Get user role by user ID
router.get('/:id/role', userController.getUserRole);

// Save FCM token
router.post('/save-fcm-token', userController.saveFCMToken);

// Get a single user by ID
router.get('/:id', userController.getUserById);

// Update a user
router.patch('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

// Update admin status
router.post('/status', userController.updateAdminStatus);

module.exports = router;
