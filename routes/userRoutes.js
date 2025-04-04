const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get a single user by ID
router.get('/:id', userController.getUserById);

// Update a user
router.patch('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

router.post('/save-fcm-token', userController.saveFCMToken);

module.exports = router;
