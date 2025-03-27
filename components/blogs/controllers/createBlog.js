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

    const existing = await Blog.findOne({ title: value.title });
    if (existing) {
      return res.status(400).json({ message: "Blog with this title already exists" });
    }

    const slug = slugify(value.title, { lower: true });

    const newBlog = new Blog({
      ...value,
      slug,
    });

    await newBlog.save();

    return res.status(201).json({ message: "Blog created" });
  } catch (error) {
    console.error("Create Blog Error:", error);
    return res.status(500).json({ message: "Server error while creating blog" });
  }
};

module.exports = createBlog;
