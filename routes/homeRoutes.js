const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Create a new home
router.post('/', homeController.createHome);

// Get all homes
router.get('/', homeController.getAllHomes);

// Get a single home by ID
router.get('/:id', homeController.getHomeById);

router.get('/user/:id', homeController.getHomebyUserId);

// Update a home
router.patch('/:id', homeController.updateHome);

// Delete a home
router.delete('/:id', homeController.deleteHome);

module.exports = router;
