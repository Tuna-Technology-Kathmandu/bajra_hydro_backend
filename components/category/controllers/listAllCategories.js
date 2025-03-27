const Category = require("../models/Category");

// Get all categories
const listAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return res.status(200).json(categories);
  } catch (error) {
    console.error("List Categories Error:", error);
    return res.status(500).json({ message: "Failed to fetch categories" });
  }
};

module.exports = listAllCategories;
