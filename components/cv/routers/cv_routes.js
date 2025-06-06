const express = require("express");
const router = express.Router();

const { addCV, upload } = require("../controllers/add_cv");
const { listAllCVs } = require("../controllers/list_all_cvs");
const {getSingleCV} = require("../controllers/get_single_cv");

router.post("/", upload.single("cv"), addCV);
router.get("/", listAllCVs);
router.get("/:id", getSingleCV);

module.exports = router;
