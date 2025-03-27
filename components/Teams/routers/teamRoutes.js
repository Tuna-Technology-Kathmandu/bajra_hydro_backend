const express = require("express");
const router = express.Router();

const createTeamMember = require("../controllers/createTeamMember");
const listAllTeamMembers = require("../controllers/listAllTeamMembers");
const getSingleTeamMember = require("../controllers/getSingleTeamMember");
const updateTeamMember = require("../controllers/updateTeamMember");
const deleteTeamMember = require("../controllers/deleteTeamMember");

// Create a new team member
router.post("/", createTeamMember);

// Get all team members
router.get("/", listAllTeamMembers);

// Get a single team member by ID
router.get("/:id", getSingleTeamMember);

// Update a team member
router.put("/:id", updateTeamMember);

// Delete a team member
router.delete("/:id", deleteTeamMember);

module.exports = router;
