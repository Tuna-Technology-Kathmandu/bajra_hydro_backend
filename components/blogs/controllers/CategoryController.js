const Category = require("../models/Category");
const slugify = require("slugify");
const categoryValidation = require("../helper/categoryValidator");

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name } = value;

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const slug = slugify(name, { lower: true });
    const newCategory = new Category({ name, slug });
    await newCategory.save();

    res.status(201).json({ message: "Category created", category: newCategory });
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({ message: "Server error while creating category" });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id } = req.params;
    const { name } = value;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name;
    category.slug = slugify(name, { lower: true });
    await category.save();

    res.status(200).json({ message: "Category updated", category });
  } catch (error) {
    console.error("Update Category Error:", error.message);
    res.status(500).json({ message: "Error updating category" });
  }
};

// Delete category by slug
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);    

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted", deleted });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category" });
  }
};

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
