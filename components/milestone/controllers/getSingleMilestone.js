const Milestone = require("../models/milestoneModel");

const getSingleMilestone = async (req, res) => {
  try {
    const { id } = req.params;

    const milestone = await Milestone.findById(id);

    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    return res.status(200).json({
      message: "Milestone fetched successfully",
      milestone,
    });
  } catch (err) {
    console.error("Get Milestone Error:", err);
    return res.status(500).json({ message: "Server error while fetching milestone" });
  }
};

module.exports = getSingleMilestone;
