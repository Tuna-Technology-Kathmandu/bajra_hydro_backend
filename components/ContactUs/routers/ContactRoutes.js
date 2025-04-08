const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verifyToken");
const checkRole = require("../../../middleware/checkRole");

const createContactMessage = require("../controllers/createContactMessage");
const listAllContactMessages = require("../controllers/ListAllContactMessages");
const getSingleContactMessage = require("../controllers/getSingleContactMessage");
const updateContactMessage = require("../controllers/updateContactMessage");
const deleteContactMessage = require("../controllers/deleteContactMessage");

router.post("/", createContactMessage);

router.get("/", verifyToken, checkRole("admin", "editor"), listAllContactMessages);

router.get("/:id", verifyToken, checkRole("admin", "editor"), getSingleContactMessage);

router.put("/:id", updateContactMessage);

router.delete("/:id", verifyToken, checkRole("admin"), deleteContactMessage);

module.exports = router;
