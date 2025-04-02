const Report = require('../models/reportModel');

// Get all reports
const listAllReports = async (req, res) => {
  try {
    // Fetch reports, sorted by the most recently created
    const reports = await Report.find().sort({ createdAt: -1 });

    return res.status(200).json(reports);
  } catch (error) {
    console.error("List Reports Error:", error);
    return res.status(500).json({ message: "Failed to fetch reports" });
  }
};

module.exports = listAllReports;
