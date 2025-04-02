const Job = require("../models/jobModel");

const listAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find()
      .sort({ postedDate: -1 })
      .skip(skip)
      .limit(limit);

    const totalJobs = await Job.countDocuments();

    return res.status(200).json({
      message: "Jobs fetched successfully",
      jobs,
      pagination: {
        currentPage: page,
        totalJobs,
        totalPages: Math.ceil(totalJobs / limit),
        jobsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("List Jobs Error:", error);
    return res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

module.exports = listAllJobs;

