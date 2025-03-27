const Blog = require("../models/Blog");

// Get a single blog by ID
const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id)
      .populate("author", "fullname email")
      .populate("categories", "name slug")
      .populate("tags", "name slug");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.error("Get Single Blog Error:", error);
    return res.status(500).json({ message: "Error retrieving blog" });
  }
};

module.exports = getSingleBlog;
