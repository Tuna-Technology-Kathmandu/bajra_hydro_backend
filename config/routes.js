const express = require("express");
const router = express.Router();

// Auth Routes
const authRoutes = require("../components/authentication/routers/authRoutes");
router.use("/auth", authRoutes);

// Category Routes
const categoryRoutes = require("../components/blogs/routers/categoryRoutes");
router.use("/categories", categoryRoutes);

// Tag Routes
const tagRoutes = require("../components/blogs/routers/tagRoutes");
router.use("/tags", tagRoutes);

// Blog Routes
const blogRoutes = require("../components/blogs/routers/blogRoutes");
router.use("/blogs", blogRoutes);

// Base route check
router.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = router;
