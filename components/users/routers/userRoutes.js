const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verifyToken");
const checkRole = require("../../../middleware/checkRole");

const listAllUsers = require("../controllers/listAllUsers");
const getSingleUser = require("../controllers/getSingleUser");
const updateUser = require("../controllers/updateUser");
const deleteUser = require("../controllers/deleteUser");

router.get("/", verifyToken, checkRole("admin", "editor"), listAllUsers);
router.get("/:id", verifyToken, checkRole("admin", "editor"), getSingleUser);
router.put("/:id", verifyToken, checkRole("admin", "editor"), updateUser);
router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteUser);

module.exports = router;
