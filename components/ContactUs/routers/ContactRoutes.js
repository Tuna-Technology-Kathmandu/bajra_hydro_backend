const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verifyToken");
const checkRole = require("../../../middleware/checkRole");

const createContactMessage = require("../controllers/createContactMessage");
const listAllContactMessages = require("../controllers/ListAllContactMessages");
const getSingleContactMessage = require("../controllers/getSingleContactMessage");
const updateContactMessage = require("../controllers/updateContactMessage");
const deleteContactMessage = require("../controllers/deleteContactMessage");

// Create a contact message
router.post("/", createContactMessage);

// List all messages
router.get("/", verifyToken, checkRole("admin", "editor"), listAllContactMessages);

// Get one message by ID
router.get("/:id", verifyToken, checkRole("admin", "editor"), getSingleContactMessage);

// Update message status
router.put("/:id", updateContactMessage);

// Delete a message
router.delete("/:id", verifyToken, checkRole("admin"), deleteContactMessage);

module.exports = router;
