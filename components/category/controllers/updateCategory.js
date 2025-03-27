const Category = require("../models/Category");
const slugify = require("slugify");
const categoryValidation = require("../helper/categoryValidator");

// Update a category by ID
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate input
    const { error, value } = categoryValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Find category by ID
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update fields
    category.name = value.name;
    category.slug = slugify(value.name, { lower: true });
    await category.save();

    // Return updated category
    return res.status(200).json({
      message: "Category updated",
      category,
    });
  } catch (error) {
    console.error("Update Category Error:", error);
    return res.status(500).json({ message: "Error updating category" });
  }
};

module.exports = updateCategory;
