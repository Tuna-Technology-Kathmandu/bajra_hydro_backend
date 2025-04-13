const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verifyToken");
const checkRole = require("../../../middleware/checkRole");

const createMilestone = require("../controllers/createMilestone");
const listAllMilestones = require("../controllers/listAllMilestones");
const getSingleMilestone = require("../controllers/getSingleMilestone");
const updateMilestone = require("../controllers/updateMilestone");
const deleteMilestone = require("../controllers/deleteMilestone");

router.post("/", verifyToken, checkRole("admin", "editor"), createMilestone);

router.get("/", listAllMilestones);

router.get("/:id", getSingleMilestone);

router.put("/:id", verifyToken, checkRole("admin", "editor"), updateMilestone);

router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteMilestone);

module.exports = router;
