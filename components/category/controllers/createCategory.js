const Category = require("../models/Category");
const slugify = require("slugify");
const categoryValidation = require("../helper/categoryValidator");

const createCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name } = {
      ...value,
    };

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const slug = slugify(name, { lower: true });
    const newCategory = new Category({ name, slug });
    await newCategory.save();

    return res.status(201).json({ message: "Category created", category: newCategory });
  } catch (error) {
    console.error("Create Category Error:", error);
    return res.status(500).json({ message: "Server error while creating category" });
  }
};

module.exports = createCategory;
