const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const createMissionVision = require("../controllers/create_mission_vision");
const listMissionVision = require("../controllers/list_mission_vision");
const updateMissionVision = require("../controllers/update_mision_vision");
const deleteMissionVision = require("../controllers/delete_mission_vision");
const getSingleMissionVison = require("../controllers/get_single_mission_vision");

router.post("/", verifyToken, checkRole("admin", "editor"), createMissionVision);
router.get("/", listMissionVision);
router.put("/:id", verifyToken, checkRole("admin", "editor"),updateMissionVision);
router.delete("/:id", verifyToken, checkRole("admin"), deleteMissionVision);
router.get("/:id", getSingleMissionVison);


module.exports = router;
