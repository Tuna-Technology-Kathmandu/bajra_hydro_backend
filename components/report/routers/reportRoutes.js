const express = require("express");
const router = express.Router();


const verifyToken = require("../../../middleware/verifyToken");
const checkRole = require("../../../middleware/checkRole");

const {createReport, upload } = require("../controllers/createReport");  
const listAllReports = require("../controllers/listAllReports");
const getSingleReport = require("../controllers/getSingleReport");
const updateReport = require("../controllers/updateReport");
const deleteReport = require("../controllers/deleteReport");
const verifyReport = require("../controllers/verifyReport");

router.post("/", verifyToken, checkRole("admin", "editor"), upload.single("file"), createReport);

router.get("/", listAllReports);

router.get("/:id", getSingleReport);

router.put("/:id", verifyToken, checkRole("admin", "editor"), updateReport);

router.put("/verify/:id", verifyToken, checkRole("admin"), verifyReport);

router.delete("/:id", verifyToken, checkRole("admin"), deleteReport);

module.exports = router;
