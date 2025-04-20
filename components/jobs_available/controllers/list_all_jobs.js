const Job = require("../models/job_model");

const listAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1;

    const categoryName = req.query.category || "";
    const subCategory = req.query.subCategory || "";
    const careerLevel = req.query.careerLevel || "";

    const searchQuery = {};

    if (careerLevel) {
      searchQuery.career_level = { $regex: careerLevel, $options: "i" };
    }

    let jobs = await Job.find(searchQuery)
      .populate("category") 
      .sort({ createdAt: sortOrder })
      .lean();

    if (categoryName) {
      jobs = jobs.filter(job =>
        job.category?.name?.toLowerCase().includes(categoryName.toLowerCase())
      );
    }

    if (subCategory) {
      jobs = jobs.filter(job =>
        job.category?.sub_category?.toLowerCase().includes(subCategory.toLowerCase())
      );
    }

    const totalJobs = jobs.length;
    const paginatedJobs = jobs.slice(skip, skip + limit);

    return res.status(200).json({
      message: "Jobs fetched successfully",
      jobs: paginatedJobs,
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
