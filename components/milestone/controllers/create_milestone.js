const Milestone = require("../models/milestone_model");
const milestoneValidation = require("../helper/milestone_validator");

const createMilestone = async (req, res) => {
  try {
    const { error, value } = milestoneValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newMilestone = new Milestone({ ...value });
    await newMilestone.save();

    return res.status(201).json({
      message: "Milestone created successfully",
      milestone: newMilestone,
    });
  } catch (err) {
    console.error("Create Milestone Error:", err);
    return res.status(500).json({ message: "Server error while creating milestone" });
  }
};

module.exports = createMilestone;