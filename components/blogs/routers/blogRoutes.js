const express = require("express");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  deleteBlog,
  updateBlog,
} = require("../controllers/BlogController");

router.post("/", createBlog);
router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);
router.delete("/:slug", deleteBlog);
router.put("/:slug", updateBlog);


module.exports = router;
