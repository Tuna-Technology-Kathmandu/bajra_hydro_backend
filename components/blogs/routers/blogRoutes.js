const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verifyToken");
const checkRole = require("../../../middleware/checkRole");

const { createBlog, upload } = require("../controllers/createBlog");
const listAllBlogs = require("../controllers/listAllBlogs");
const getSingleBlog = require("../controllers/getSingleBlog");
const updateBlog = require("../controllers/updateBlog");
const deleteBlog = require("../controllers/deleteBlog");
const verifyBlog = require("../controllers/verifyBlog");

router.post("/", upload.single("image"), createBlog);
router.get("/", listAllBlogs);
router.get("/:id", getSingleBlog);
router.put("/:id", verifyToken, checkRole("admin", "editor"), updateBlog);
router.delete("/:id", verifyToken, checkRole("admin"), deleteBlog);
router.put("/verify/:id", verifyToken, checkRole("admin"), verifyBlog);

module.exports = router;
