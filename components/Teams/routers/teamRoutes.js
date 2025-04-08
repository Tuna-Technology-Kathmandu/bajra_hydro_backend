const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verifyToken");
const checkRole = require("../../../middleware/checkRole")

const { createTeamMember, upload } = require("../controllers/createTeamMember");
const listAllTeamMembers = require("../controllers/listAllTeamMembers");
const getSingleTeamMember = require("../controllers/getSingleTeamMember");
const updateTeamMember = require("../controllers/updateTeamMember");
const deleteTeamMember = require("../controllers/deleteTeamMember");
const verifyTeamMember = require("../controllers/verifyTeamMember"); 


router.post("/", verifyToken, checkRole("admin", "editor"), upload.single("photo"), createTeamMember);
router.get("/", listAllTeamMembers);
router.get("/", getSingleTeamMember);
router.put("/:id", verifyToken, checkRole("admin", "editor"), updateTeamMember);
router.put("/verify/:id", verifyToken, checkRole("admin"), verifyTeamMember);
router.delete("/:id", verifyToken, checkRole("admin"), deleteTeamMember);

module.exports = router;
