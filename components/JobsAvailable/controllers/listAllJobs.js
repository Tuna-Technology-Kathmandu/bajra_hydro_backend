const Job = require("../models/jobModel");

const listAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1; 


    const search = req.query.search || "";

    const searchQuery = {
      $or: [
      {position : { $regex: search, $options: "i" }},
      {careerLevel: { $regex: search, $options: "i" }},
      {jobCategory:  { $regex: search, $options: "i" }},
      {location:  { $regex: search, $options: "i" }}
    ]
    };

    const jobs = await Job.find(searchQuery)
      .sort({ createdAt: sortOrder}) 
      .skip(skip)
      .limit(limit)
      .lean();


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
