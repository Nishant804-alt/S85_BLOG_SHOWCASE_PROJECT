const express = require('express');
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  connectionStatus,
} = require('./controllers/blogController');

// Home route: returns DB connection status
router.get('/', connectionStatus);

// CRUD Routes
router.post('/blogs', createBlog);
router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogById);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

module.exports = router;
