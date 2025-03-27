const Team = require("../models/teamModel");
const teamValidator = require("../helper/teamValidator");

// Create a team member
const createTeamMember = async (req, res) => {
  try {
    const { error, value } = teamValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newMember = new Team({ ...value });
    await newMember.save();

    return res.status(201).json({ message: "Team member created successfully." });
  } catch (error) {
    console.error("Create Team Member Error:", error);
    return res.status(500).json({ message: "Server error while creating team member" });
  }
};

module.exports = createTeamMember;
