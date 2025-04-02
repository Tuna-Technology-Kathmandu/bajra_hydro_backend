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

// Create a new testimonial (Only editor/admin)
router.post("/", verifyToken, checkRole("editor", "admin"), upload.single("photo"), createTestimonial);

// Get all testimonials (Public)
router.get("/", listAllTestimonials);

// Get a single testimonial by ID (Public)
router.get("/:id", getSingleTestimonial);

// Update a testimonial (Only editor/admin)
router.put("/:id", verifyToken, checkRole("editor", "admin"), updateTestimonial);

// Delete a testimonial (Only admin)
router.delete("/:id", verifyToken, checkRole("admin"), deleteTestimonial);

// Verify a testimonial (Only admin)
router.put("/verify/:id", verifyToken, checkRole("admin"), verifyTestimonial);

module.exports = router;
