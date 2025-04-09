const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verifyToken");
const checkRole = require("../../../middleware/checkRole");

const createCategory = require("../controllers/createCategory");
const listAllCategories = require("../controllers/listAllCategories");
const getSingleCategory = require("../controllers/getSingleCategory");
const updateCategory = require("../controllers/updateCategory");
const deleteCategory = require("../controllers/deleteCategory");

router.post("/", verifyToken, checkRole("admin", "editor"), createCategory);

router.get("/", listAllCategories);

router.get("/:id", verifyToken, checkRole("admin", "editor"), getSingleCategory);

router.put("/:id", verifyToken, checkRole("admin", "editor"), updateCategory);

router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteCategory);

module.exports = router;
