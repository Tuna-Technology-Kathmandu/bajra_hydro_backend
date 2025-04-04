const Report = require("../models/reportModel");

const listAllReports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const searchQuery = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const reports = await Report.find(searchQuery)
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit);

    const totalReports = await Report.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Reports fetched successfully",
      reports,
      pagination: {
        currentPage: page,
        totalReports,
        totalPages: Math.ceil(totalReports / limit),
        reportsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("List Reports Error:", error);
    return res.status(500).json({ message: "Failed to fetch reports" });
  }
};

module.exports = listAllReports;
