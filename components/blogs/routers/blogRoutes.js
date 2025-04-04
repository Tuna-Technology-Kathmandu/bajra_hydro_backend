const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const verifyToken = require("../../../middleware/verifyToken");
const checkRole = require("../../../middleware/checkRole");

const createBlog = require("../controllers/createBlog");
const listAllBlogs = require("../controllers/listAllBlogs");
const getSingleBlog = require("../controllers/getSingleBlog");
const updateBlog = require("../controllers/updateBlog");
const deleteBlog = require("../controllers/deleteBlog");
const verifyBlog = require("../controllers/verifyBlog");

router.post("/", verifyToken, checkRole("admin", "editor"), upload.fields([{ name: "image", maxCount: 10 }]), createBlog);
router.get("/", listAllBlogs);
router.get("/:id", getSingleBlog);
router.put("/:id", verifyToken, checkRole("admin", "editor"), updateBlog);
router.delete("/:id", verifyToken, checkRole("admin"), deleteBlog);
router.put("/verify/:id", verifyToken, checkRole("admin"), verifyBlog);

module.exports = router;
