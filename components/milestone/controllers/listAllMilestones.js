const Milestone = require("../models/milestoneModel");

const listAllMilestones = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1;
    const search = req.query.search || "";

    const searchQuery = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const milestones = await Milestone.find(searchQuery)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalMilestones = await Milestone.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Milestones fetched successfully",
      milestones,
      pagination: {
        currentPage: page,
        totalMilestones,
        totalPages: Math.ceil(totalMilestones / limit),
        milestonesPerPage: limit,
      },
    });
  } catch (error) {
    console.error("List Milestones Error:", error);
    return res.status(500).json({ message: "Failed to fetch milestones" });
  }
};

module.exports = listAllMilestones;
