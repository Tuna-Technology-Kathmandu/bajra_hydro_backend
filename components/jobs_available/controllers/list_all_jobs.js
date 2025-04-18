const Job = require("../models/job_model");

const listAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortOrder = req.query.sort === "asc" ? 1 : -1;

    // Get filter values from query params
    const search = req.query.search || "";
    const position = req.query.position || ""; 
    const careerLevel = req.query.careerLevel || "";
    const jobCategory = req.query.jobCategory || "";
    const location = req.query.location || "";

    // Build the search query
    const searchQuery = {};

    // Apply filters if values are provided
    if (search) {
      searchQuery.$or = [
        { position: { $regex: search, $options: "i" } }, 
        { careerLevel: { $regex: search, $options: "i" } },
        { jobCategory: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ];
    }

    if (position) {
      searchQuery.position = { $regex: position, $options: "i" };
    }
    if (careerLevel) {
      searchQuery.careerLevel = { $regex: careerLevel, $options: "i" };
    }
    if (jobCategory) {
      searchQuery.jobCategory = { $regex: jobCategory, $options: "i" };
    }
    if (location) {
      searchQuery.location = { $regex: location, $options: "i" };
    }

    // Fetch the jobs based on the search query, pagination, and sorting
    const jobs = await Job.find(searchQuery)
      .sort({ createdAt: sortOrder })  // Sorting by creation date
      .skip(skip)  // Pagination: skip jobs for the current page
      .limit(limit)  // Pagination: limit the number of jobs per page
      .lean();  // Use lean() for better performance

    // Get the total number of matching jobs
    const totalJobs = await Job.countDocuments(searchQuery);

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
