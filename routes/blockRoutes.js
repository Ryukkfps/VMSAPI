const express = require('express');
const router = express.Router();
const blockController = require('../controllers/blockController');

// Create a new block
router.post('/', blockController.createBlock);

// Get all blocks
router.get('/', blockController.getAllBlocks);

// Get a single block by ID
router.get('/:id', blockController.getBlockById);

// Update a block
router.patch('/:id', blockController.updateBlock);

// Delete a block
router.delete('/:id', blockController.deleteBlock);

module.exports = router;
