const express = require('express');
const router = express.Router();
const societyController = require('../controllers/societyController');

// Create a new society
router.post('/', societyController.createSociety);

// Get all societies
router.get('/', societyController.getAllSocieties);

// Get a single society by ID
router.get('/:id', societyController.getSocietyById);

// Update a society
router.patch('/:id', societyController.updateSociety);

// Delete a society
router.delete('/:id', societyController.deleteSociety);

module.exports = router;
