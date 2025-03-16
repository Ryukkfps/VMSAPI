const express = require('express');
const router = express.Router();
const ownershipTypeController = require('../controllers/ownershipTypeController');

// Create a new ownership type
router.post('/', ownershipTypeController.createOwnershipType);

// Get all ownership types
router.get('/', ownershipTypeController.getAllOwnershipTypes);

// Get a single ownership type by ID
router.get('/:id', ownershipTypeController.getOwnershipTypeById);

// Update an ownership type
router.patch('/:id', ownershipTypeController.updateOwnershipType);

// Delete an ownership type
router.delete('/:id', ownershipTypeController.deleteOwnershipType);

module.exports = router;
