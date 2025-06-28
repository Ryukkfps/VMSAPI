const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Create feedback (with image upload)
router.post('/', feedbackController.createFeedback);

// Get all feedback
router.get('/', feedbackController.getAllFeedback);

// Get feedback by ID
router.get('/:id', feedbackController.getFeedbackById);

// Update feedback (with image upload)
router.put('/:id', feedbackController.updateFeedback);

// Delete feedback
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
