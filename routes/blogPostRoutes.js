const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const blogPostController = require('../controllers/blogPostController');

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'wwwroot', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Routes
router.post('/', upload.single('image'), blogPostController.createPost);
router.get('/', blogPostController.getAllPosts);
router.get('/:id', blogPostController.getPostById);
router.put('/:id', upload.single('image'), blogPostController.updatePost);
router.delete('/:id', blogPostController.deletePost);
router.get('/society/:SId',blogPostController.getAllPostBySociety);

module.exports = router;
