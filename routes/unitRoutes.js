const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unitController');

// Create a new unit
router.post('/', unitController.createUnit);

// Get all units
router.get('/', unitController.getAllUnits);

// Get a single unit by ID
router.get('/:id', unitController.getUnitById);

// Update a unit
router.patch('/:id', unitController.updateUnit);

// Delete a unit
router.delete('/:id', unitController.deleteUnit);

module.exports = router;
