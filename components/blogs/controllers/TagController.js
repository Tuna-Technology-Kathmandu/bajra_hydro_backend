const Tag = require("../models/Tag");
const slugify = require("slugify");
const tagValidation = require("../helper/tagValidator")

// Create a new tag
const createTag = async (req, res) => {
  try {
    const { error, value } = tagValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name } = value;
    
    // Check if tag already exists
    const existing = await Tag.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Tag already exists" });
    }

    const slug = slugify(name, { lower: true });
    const newTag = new Tag({ name, slug });
    await newTag.save();

    res.status(201).json({ message: "Tag created", tag: newTag });
  } catch (error) {
    console.error("Create Tag Error:", error);
    res.status(500).json({ message: "Server error while creating tag" });
  }
};

//Get all tags
const getTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ createdAt: -1 });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tags" });
  }
};

// Update a category
const updateTag = async (req, res) => {
  try {
    const { error, value } = tagValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id } = req.params;
    const { name } = value;

    const tag = await Tag.findById(id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    tag.name = name;
    tag.slug = slugify(name, { lower: true });
    await tag.save();

    res.status(200).json({ message: "Tag updated", tag });
  } catch (error) {
    console.error("Update Tag Error:", error.message);
    res.status(500).json({ message: "Error updating tag" });
  }
};
// Delete tag by slug
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tag.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.status(200).json({ message: "Tag deleted", deleted });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete tag" });
  }
};

module.exports = {
  createTag,
  getTags,
  updateTag,
  deleteTag,
};
