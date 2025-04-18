const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const createMilestone = require("../controllers/create_milestone");
const listAllMilestones = require("../controllers/list_all_milestones");
const getSingleMilestone = require("../controllers/get_single_milestone");
const updateMilestone = require("../controllers/update_milestone");
const deleteMilestone = require("../controllers/delete_milestone");

router.post("/", verifyToken, checkRole("admin", "editor"), createMilestone);

router.get("/", listAllMilestones);

router.get("/:id", getSingleMilestone);

router.put("/:id", verifyToken, checkRole("admin", "editor"), updateMilestone);

router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteMilestone);

module.exports = router;
