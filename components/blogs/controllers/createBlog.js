const Blog = require("../models/Blog");
const slugify = require("slugify");
const blogValidation = require("../helper/blogValidator");

const createBlog = async (req, res) => {
  try {
   
    const { error, value } = blogValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingBlog = await Blog.findOne({ title: value.title });
    if (existingBlog) {
      return res.status(400).json({ message: "A blog with this title already exists." });
    }
    
    const uploadedImages = req.files?.image || [];
    if (uploadedImages.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const imageUrl = uploadedImages[0].path; 
    const gallery = uploadedImages.slice(1).map(file => file.path); 

    const slug = slugify(value.title, { lower: true });

    const newBlog = new Blog({
      ...value,
      slug,
      imageUrl,
      gallery, 
    });

    await newBlog.save();

    return res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (err) {
    console.error("Create Blog Error:", err);
    return res.status(500).json({ message: "Failed to create blog" });
  }
};

module.exports = createBlog;
