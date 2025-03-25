
const Blog = require("../models/Blog");
const slugify = require("slugify");
const blogValidation = require("../helper/blogValidator");

// Create a blog
const createBlog = async (req, res) => {
  try {
    const { error, value } = blogValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, content, author, categories, tags, imageUrl } = value;

    const existing = await Blog.findOne({ title });
    if (existing) {
      return res.status(400).json({ message: "Blog with this title already exists" });
    }

    const slug = slugify(title, { lower: true });

    const newBlog = new Blog({
      title,
      slug,
      content,
      author,
      categories,
      tags,
      imageUrl,
    });

    await newBlog.save();

    res.status(201).json({ message: "Blog created", blog: newBlog });
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({ message: "Server error while creating blog" });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "fullname email")
      .populate("categories", "name slug")
      .populate("tags", "name slug")
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Get Blogs Error:", error);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

// Get blog by slug
const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug })
      .populate("author", "fullname email")
      .populate("categories", "name slug")
      .populate("tags", "name slug");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Get Blog Error:", error);
    res.status(500).json({ message: "Error retrieving blog" });
  }
};

// Update blog by slug
const updateBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const updates = req.body;

    if (updates.title) {
      updates.slug = slugify(updates.title, { lower: true });
    }

    const updatedBlog = await Blog.findOneAndUpdate({ slug }, updates, {
      new: true,
    })
      .populate("author", "fullname email")
      .populate("categories", "name slug")
      .populate("tags", "name slug");

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    console.error("Update Blog Error:", error);
    res.status(500).json({ message: "Error updating blog" });
  }
};

// Delete blog by slug
const deleteBlog = async (req, res) => {
  try {
    const { slug } = req.params;

    const deleted = await Blog.findOneAndDelete({ slug });

    if (!deleted) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted", deleted });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    res.status(500).json({ message: "Error deleting blog" });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};
