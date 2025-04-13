const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verifyToken");
const checkRole = require("../../../middleware/checkRole");

const { createCEOMessage, upload } = require("../controllers/createCEOMessage");
const listAllCEOMessages = require("../controllers/listAllCEOMessages");
const getSingleCEOMessage = require("../controllers/getSingleCEOMessage");
const updateCEOMessage = require("../controllers/updateCEOMessage");
const deleteCEOMessage = require("../controllers/deleteCEOMessage");

router.post("/", verifyToken, checkRole("admin", "editor"), upload.single("photo"), createCEOMessage);

router.get("/", listAllCEOMessages);

router.get("/:id", getSingleCEOMessage);

router.put("/:id", verifyToken, checkRole("admin", "editor"), upload.single("photo"), updateCEOMessage);

router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteCEOMessage);

module.exports = router;
