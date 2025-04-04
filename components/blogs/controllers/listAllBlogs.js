const Blog = require("../models/Blog");

const listAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const searchQuery = {
      title: { $regex: search, $options: "i" }
    };

    const blogs = await Blog.find(searchQuery)
      .populate("author", "fullname email")
      .populate("categories", "name slug")
      .populate("tags", "name slug")
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit);

    const totalBlogs = await Blog.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Blogs fetched successfully",
      blogs,
      pagination: {
        currentPage: page,
        totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
        blogsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("List Blogs Error:", error);
    return res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

module.exports = listAllBlogs;
