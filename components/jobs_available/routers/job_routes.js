const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const createJob = require("../controllers/create_job"); 
const listAllJobs = require("../controllers/list_all_jobs");  
const getSingleJob = require("../controllers/get_single_job");  
const updateJob = require("../controllers/update_job");
// const verifyJob = require("../controllers/verifyJob"); 
const deleteJob = require("../controllers/delete_job");  

router.post("/", verifyToken, checkRole("admin", "editor"), createJob);  

router.get("/", listAllJobs);  

router.get("/:id", getSingleJob);  

router.put("/:id", verifyToken, checkRole("admin", "editor"), updateJob); 

// router.put("/verify/:id", verifyToken, checkRole("admin"), verifyJob);

router.delete("/:id", verifyToken, checkRole("admin"), deleteJob); 

module.exports = router;
