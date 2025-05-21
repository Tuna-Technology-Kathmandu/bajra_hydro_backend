
const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const { createGallery, upload } = require("../controllers/create_gallery");
const { updateGallery } = require("../controllers/update_gallery");
const listAllPopup = require("../controllers/list_popup");
const getSingleGallery = require("../controllers/get_single_gallery");
const deleteGallery = require("../controllers/delete_gallery");

router.post("/", verifyToken, checkRole("admin", "editor"), upload.single("image"), createGallery);
router.put("/:id", verifyToken, checkRole("admin", "editor"), upload.single("image"), updateGallery);
router.get("/", listAllPopup);
router.get("/:id", getSingleGallery);
router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteGallery);

module.exports = router;
