const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verifyToken");
const checkRole = require("../../../middleware/checkRole");

const createSubscriber = require("../controllers/createSubscriber");
const listAllSubscribers = require("../controllers/listAllSubscribers");
const getSingleSubscriber = require("../controllers/getSingleSubscriber");
const updateSubscriber = require("../controllers/updateSubscriber");
const deleteSubscriber = require("../controllers/deleteSubscriber");


router.post("/", createSubscriber);

router.get("/", verifyToken, checkRole("admin", "editor"), listAllSubscribers);

router.get("/:id", verifyToken, checkRole("admin", "editor"), getSingleSubscriber);

router.put("/:id", verifyToken, checkRole("admin", "editor"), updateSubscriber);

router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteSubscriber);

module.exports = router;
