const Blog = require("../models/blog.model");

// Create blog
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.create({ title, content, author: req.user._id });
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username");
    res.status(200).json({ success: true, data: blogs });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!blog) {
      return res.status(404).json({ success: false, error: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Update blog
const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ success: false, error: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, error: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
