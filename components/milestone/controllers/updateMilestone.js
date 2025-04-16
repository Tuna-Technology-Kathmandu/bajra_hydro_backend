const Milestone = require("../models/milestoneModel");
const milestoneValidation = require("../helper/milestoneValidator");

const updateMilestone = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = milestoneValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const milestone = await Milestone.findById(id);
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    milestone.title = value.title;
    milestone.description = value.description;
    await milestone.save();

    return res.status(200).json({
      message: "Milestone updated",
      milestone,
    });
  } catch (error) {
    console.error("Update Milestone Error:", error);
    return res.status(500).json({ message: "Error updating milestone" });
  }
};

module.exports = updateMilestone;
