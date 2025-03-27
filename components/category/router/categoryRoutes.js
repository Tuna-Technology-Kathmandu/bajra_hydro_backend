const express = require("express");
const router = express.Router();

const createCategory = require("../controllers/createCategory");
const listAllCategories = require("../controllers/listAllCategories");
const getSingleCategory = require("../controllers/getSingleCategory");
const updateCategory = require("../controllers/updateCategory");
const deleteCategory = require("../controllers/deleteCategory");


router.post("/", createCategory);

router.get("/", listAllCategories);

router.get("/:id", getSingleCategory);

router.put("/:id", updateCategory);


router.delete("/:id", deleteCategory);

module.exports = router;
