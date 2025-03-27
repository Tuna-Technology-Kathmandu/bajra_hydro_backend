const express = require("express");
const router = express.Router();

const createBlog = require("../controllers/createBlog");
const listAllBlogs = require("../controllers/listAllBlogs");
const getSingleBlog = require("../controllers/getSingleBlog");
const updateBlog = require("../controllers/updateBlog");
const deleteBlog = require("../controllers/deleteBlog");

router.post("/", createBlog);
router.get("/", listAllBlogs);
router.get("/:id", getSingleBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);


module.exports = router;
