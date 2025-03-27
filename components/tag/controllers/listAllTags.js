const Tag = require("../models/Tag");

// Get all tags
const listAllTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ createdAt: -1 });

    return res.status(200).json(tags);
  } catch (error) {
    console.error("List Tags Error:", error);
    return res.status(500).json({ message: "Failed to fetch tags" });
  }
};

module.exports = listAllTags;
