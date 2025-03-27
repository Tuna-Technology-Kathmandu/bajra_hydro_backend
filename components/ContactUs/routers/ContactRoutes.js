const express = require("express");
const router = express.Router();

const createContactMessage = require("../controllers/createContactMessage");
const listAllContactMessages = require("../controllers/listAllContactMessages");
const getSingleContactMessage = require("../controllers/getSingleContactMessage");
const updateContactMessage = require("../controllers/updateContactMessage");
const deleteContactMessage = require("../controllers/deleteContactMessage");

// Create a contact message
router.post("/", createContactMessage);

// List all messages
router.get("/", listAllContactMessages);

// Get one message by ID
router.get("/:id", getSingleContactMessage);

// Update message status
router.put("/:id", updateContactMessage);

// Delete a message
router.delete("/:id", deleteContactMessage);

module.exports = router;
