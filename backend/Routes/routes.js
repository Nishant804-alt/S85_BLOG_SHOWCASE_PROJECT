const express = require("express");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  connectionStatus,
} = require("../controllers/blogController");

const blogValidationRules = require("../validators/blogValidator");
const handleValidation = require("../validators/handleValidation");

// Home route: returns DB connection status
router.get("/", connectionStatus);

// CRUD Routes with validation
router.post("/blogs", blogValidationRules, handleValidation, createBlog);
router.put("/blogs/:id", blogValidationRules, handleValidation, updateBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.delete("/blogs/:id", deleteBlog);

module.exports = router;
