const Contact = require("../models/contactUsModel");

const listAllContactMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const searchQuery = search
      ? { name: { $regex: search, $options: "i" } }
      : {}; 

    const messages = await Contact.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalMessages = await Contact.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Contact messages fetched successfully",
      messages,
      pagination: {
        currentPage: page,
        totalMessages,
        totalPages: Math.ceil(totalMessages / limit),
        messagesPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get Contact Messages Error:", error);
    return res.status(500).json({ message: "Failed to fetch contact messages" });
  }
};

module.exports = listAllContactMessages;
