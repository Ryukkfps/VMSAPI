const BlogPost = require('../models/blogPostModel');
const path = require('path');
const fs = require('fs');

// Create a blog post
exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const imagePath = req.file ? path.join('uploads', req.file.filename) : null;

    const newPost = new BlogPost({
      title,
      content,
      author,
      image: imagePath
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post', details: error.message });
  }
};

// Get all blog posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('author');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
};

// Get a single blog post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author');
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve post' });
  }
};

// Update a blog post
exports.updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (req.file) {
      // Delete old image if exists
      if (post.image) {
        const oldPath = path.join(__dirname, '..', 'wwwroot', post.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      post.image = path.join('uploads', req.file.filename);
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.author = req.body.author || post.author;

    await post.save();
    res.status(200).json({ message: 'Post updated', post });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post', details: error.message });
  }
};

// Delete a blog post
exports.deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Delete image if exists
    if (post.image) {
      const imagePath = path.join(__dirname, '..', 'wwwroot', post.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};
