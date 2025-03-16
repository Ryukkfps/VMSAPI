const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Create a new role
router.post('/', roleController.createRole);

// Get all roles
router.get('/', roleController.getAllRoles);

// Get a single role by ID
router.get('/:id', roleController.getRoleById);

// Update a role
router.patch('/:id', roleController.updateRole);

// Delete a role
router.delete('/:id', roleController.deleteRole);

module.exports = router;
