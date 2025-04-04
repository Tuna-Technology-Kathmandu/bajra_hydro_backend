const Tag = require("../models/Tag");

const listAllTags = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const searchQuery = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const tags = await Tag.find(searchQuery)
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit);

    const totalTags = await Tag.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Tags fetched successfully",
      tags,
      pagination: {
        currentPage: page,
        totalTags,
        totalPages: Math.ceil(totalTags / limit),
        tagsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("List Tags Error:", error);
    return res.status(500).json({ message: "Failed to fetch tags" });
  }
};

module.exports = listAllTags;
