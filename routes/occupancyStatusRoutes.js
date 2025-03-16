const express = require('express');
const router = express.Router();
const occupancyStatusController = require('../controllers/occupancyStatusController');

// Create a new occupancy status
router.post('/', occupancyStatusController.createOccupancyStatus);

// Get all occupancy statuses
router.get('/', occupancyStatusController.getAllOccupancyStatuses);

// Get a single occupancy status by ID
router.get('/:id', occupancyStatusController.getOccupancyStatusById);

// Update an occupancy status
router.patch('/:id', occupancyStatusController.updateOccupancyStatus);

// Delete an occupancy status
router.delete('/:id', occupancyStatusController.deleteOccupancyStatus);

module.exports = router;
