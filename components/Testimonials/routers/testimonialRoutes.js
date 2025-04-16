const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verifyToken");
const checkRole = require("../../../middleware/checkRole");

const { createTestimonial, upload } = require("../controllers/createTestimonial");
const listAllTestimonials = require("../controllers/listAllTestimonials");
const getSingleTestimonial = require("../controllers/getSingleTestimonial");
const updateTestimonial = require("../controllers/updateTestimonial");
const deleteTestimonial = require("../controllers/deleteTestimonial");
const verifyTestimonial = require("../controllers/verifyTestimonial"); 

router.post("/", verifyToken, checkRole("editor", "admin"), upload.single("photo"), createTestimonial);

router.get("/", listAllTestimonials);

router.get("/:id", getSingleTestimonial);

router.put("/:id", verifyToken, checkRole("editor", "admin"), updateTestimonial);

router.delete("/:id", verifyToken, checkRole("admin"), deleteTestimonial);

router.put("/verify/:id", verifyToken, checkRole("admin"), verifyTestimonial);

module.exports = router;
