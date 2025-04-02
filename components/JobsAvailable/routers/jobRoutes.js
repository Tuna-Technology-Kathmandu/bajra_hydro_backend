const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verifyToken");
const checkRole = require("../../../middleware/checkRole");

const createJob = require("../controllers/createJob"); 
const listAllJobs = require("../controllers/listAllJobs");  
const getSingleJob = require("../controllers/getSingleJob");  
const updateJob = require("../controllers/updateJob");
const verifyJob = require("../controllers/verifyJob"); 
const deleteJob = require("../controllers/deleteJob");  

router.post("/", verifyToken, checkRole("admin", "editor"), createJob);  

router.get("/", listAllJobs);  

router.get("/:id", getSingleJob);  

router.put("/:id", verifyToken, checkRole("admin", "editor"), updateJob); 

router.put("/verify/:id", verifyToken, checkRole("admin"), verifyJob);

router.delete("/:id", verifyToken, checkRole("admin"), deleteJob); 

module.exports = router;
