const express = require("express");
const router = express.Router();

const { createTestimonial, upload } = require("../controllers/createTestimonial");
const listAllTestimonials = require("../controllers/listAllTestimonials");
const getSingleTestimonial = require("../controllers/getSingleTestimonial");
const updateTestimonial = require("../controllers/updateTestimonial");
const deleteTestimonial = require("../controllers/deleteTestimonial");

// Create a new testimonial
router.post("/", upload.single("photo"), createTestimonial);

// Get all testimonials
router.get("/", listAllTestimonials);

// Get a single testimonial by ID
router.get("/:id", getSingleTestimonial);

// Update a testimonial
router.put("/:id", updateTestimonial);

// Delete a testimonial
router.delete("/:id", deleteTestimonial);

module.exports = router;
