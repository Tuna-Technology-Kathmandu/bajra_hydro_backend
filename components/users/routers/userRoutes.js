const express = require("express");
const router = express.Router();


const verifyToken = require("../../../middleware/verifyToken");
const checkRole = require("../../../middleware/checkRole");

const { listAllUsers, userProfile } = require("../controllers/GetUserControllers");


router.get("/", listAllUsers);

router.get("/:id", userProfile);

module.exports = router;
