const Contact = require("../models/contactUsModel");

// Get all contact messages
const listAllContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Get Contact Messages Error:", error);
    return res.status(500).json({ message: "Failed to fetch contact messages" });
  }
};

module.exports = listAllContactMessages;
