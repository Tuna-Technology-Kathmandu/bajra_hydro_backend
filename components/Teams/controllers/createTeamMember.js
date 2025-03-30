const Team = require("../models/teamModel");
const teamValidator = require("../helper/teamValidator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage }); 

// Create a team member
const createTeamMember = async (req, res) => {
  try {
    const { error, value } = teamValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const photoUrl = req.file?.path || ""; 

    const newMember = new Team({
      ...value,
      photoUrl,
    });

    await newMember.save();

    return res.status(201).json({
      message: "Team member created successfully.",
      newMember,
    });
  } catch (error) {
    console.error("Create Team Member Error:", error);
    return res.status(500).json({ message: "Server error while creating team member" });
  }
};

module.exports = { createTeamMember, upload };
