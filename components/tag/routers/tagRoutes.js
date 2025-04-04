const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verifyToken");
const checkRole = require("../../../middleware/checkRole");

const createTag = require("../controllers/createTag");
const listAllTags = require("../controllers/listAllTags");
const getSingleTag = require("../controllers/getSingleTag");
const updateTag = require("../controllers/updateTag");
const deleteTag = require("../controllers/deleteTag");

router.post("/", verifyToken, checkRole("admin", "editor"), createTag);
router.get("/", verifyToken, checkRole("admin", "editor"), listAllTags);
router.get("/:id", verifyToken, checkRole("admin", "editor"), getSingleTag);
router.put("/:id", verifyToken, checkRole("admin", "editor"), updateTag);
router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteTag);

module.exports = router;
