const Milestone = require("../models/milestone_model");

const deleteMilestone = async (req, res) => {
  try {
    const { id } = req.params;

    const milestone = await Milestone.findById(id);
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    await milestone.deleteOne();

    return res.status(200).json({ message: "Milestone deleted successfully" });
  } catch (error) {
    console.error("Delete Milestone Error:", error);
    return res.status(500).json({ message: "Error deleting milestone" });
  }
};

module.exports = deleteMilestone;