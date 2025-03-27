const Blog = require("../models/Blog");

// Get all blogs
const listAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "fullname email")
      .populate("categories", "name slug")
      .populate("tags", "name slug")
      .sort({ createdAt: -1 });

    return res.status(200).json(blogs);
  } catch (error) {
    console.error("List Blogs Error:", error);
    return res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

module.exports = listAllBlogs;
