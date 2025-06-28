const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Feedback = require('../models/feedbackModel');

// Ensure upload directory exists
const feedbackDir = path.join(__dirname, '../wwwroot/feedback');
if (!fs.existsSync(feedbackDir)) {
  fs.mkdirSync(feedbackDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, feedbackDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// CREATE feedback
exports.createFeedback = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { name, suggestion } = req.body;
      let imagePath = '';
      if (req.file) {
        // Store relative path for DB
        imagePath = path.join('feedback', req.file.filename).replace(/\\/g, '/');
      }
      const feedback = new Feedback({
        name,
        suggestion,
        image: imagePath
      });
      await feedback.save();
      res.status(201).json(feedback);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

// READ all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE feedback
exports.updateFeedback = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { name, suggestion } = req.body;
      let updateData = { name, suggestion };
      if (req.file) {
        updateData.image = path.join('feedback', req.file.filename).replace(/\\/g, '/');
      }
      const feedback = await Feedback.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
      if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
      res.status(200).json(feedback);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

// DELETE feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    // Optionally delete image file
    if (feedback.image) {
      const imgPath = path.join(__dirname, '../wwwroot', feedback.image);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }
    res.status(200).json({ message: 'Feedback deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export multer upload for use in routes
exports.upload = upload;
