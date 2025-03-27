const Team = require("../models/teamModel");
const teamValidator = require("../helper/teamValidator");

// Update a team member by ID
const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = teamValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updated = await Team.findByIdAndUpdate(id, value, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Team member not found" });
    }

    return res.status(200).json({
      message: "Team member updated successfully",
      updated,
    });
  } catch (error) {
    console.error("Update Team Member Error:", error);
    return res.status(500).json({ message: "Failed to update team member" });
  }
};

module.exports = updateTeamMember;
