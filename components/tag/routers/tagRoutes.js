const express = require("express");
const router = express.Router();

const createTag = require("../controllers/createTag");
const listAllTags = require("../controllers/listAllTags");
const getSingleTag = require("../controllers/getSingleTag");
const updateTag = require("../controllers/updateTag");
const deleteTag = require("../controllers/deleteTag");

router.post("/", createTag);
router.get("/", listAllTags);
router.get("/:id", getSingleTag);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

module.exports = router;
