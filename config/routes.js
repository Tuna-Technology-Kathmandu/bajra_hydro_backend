const express = require("express");
const router = express.Router();

// Auth Routes
const authRoutes = require("../components/authentication/routers/authRoutes");
router.use("/auth", authRoutes);

// Category Routes
const categoryRoutes = require("../components/category/router/categoryRoutes");
router.use("/categories", categoryRoutes);

// Tag Routes
const tagRoutes = require("../components/tag/routers/tagRoutes");
router.use("/tags", tagRoutes);

// Blog Routes
const blogRoutes = require("../components/blogs/routers/blogRoutes");
router.use("/blogs", blogRoutes);

//Contact Us Routes
const contactRoutes = require("../components/ContactUs/routers/ContactRoutes");
router.use("/contact", contactRoutes);

//Team Routes
const teamRoutes = require("../components/Teams/routers/teamRoutes");
router.use("/team", teamRoutes);

//Testimonial Routes
const testimonialRoutes = require("../components/Testimonials/routers/testimonialRoutes");
router.use("/testimonials", testimonialRoutes);

// Report Routes 
const reportRoutes = require("../components/report/routers/reportRoutes"); 
router.use("/reports", reportRoutes); 

// User Routes 
const userRoutes = require("../components/users/routers/userRoutes"); 
router.use("/users", userRoutes); 

// Job Routes
const jobRoutes = require("../components/JobsAvailable/routers/jobRoutes"); 
router.use("/jobs", jobRoutes); 

// Milestone Routes
const milestoneRoutes = require("../components/milestone/routers/milestoneRoutes");
router.use("/milestones", milestoneRoutes);

//CEO Message Routes
const ceoMessageRoutes = require("../components/CEO_message/routers/CEOMEssageRoutes");
router.use("/ceo-message", ceoMessageRoutes);

// Base route check
router.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = router;
