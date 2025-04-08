const Team = require("../models/teamModel");

const listAllTeamMembers = async (req, res) => {
  try {
    const members = await Team.find({ status: "approved" }).sort({ createdAt: -1 });

    return res.status(200).json(members);
  } catch (error) {
    console.error("List Team Members Error:", error);
    return res.status(500).json({ message: "Failed to fetch team members" });
  }
};

module.exports = listAllTeamMembers;
