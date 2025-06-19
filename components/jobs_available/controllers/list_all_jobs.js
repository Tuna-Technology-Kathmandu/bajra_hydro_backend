const Job = require("../models/job_model");
const CategoryModel = require("../../category/models/category_model");
const mongoose = require("mongoose");

const listAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1;

    const query = {};

    const category = req.query.category;
    if (category) {
      const catResponse = await CategoryModel.findOne({
        name: { $regex: new RegExp(`^${category}$`, "i") },
      });

      if (!catResponse) {
        return res.status(404).json({ message: "Category not found" });
      }

      query.category = catResponse._id;
    }

    const level = req.query.level;
    if (level) {
      query.level = { $regex: new RegExp(`^${level}$`, "i") };
    }

    const jobType = req.query.job_type;
    if (jobType) {
      query.job_type = { $regex: new RegExp(`^${jobType}$`, "i") };
    }

    const search = req.query.search;
    if (search) {
      const catMatches = await CategoryModel.find({
        name: { $regex: new RegExp(search, "i") },
      });
    
      const categoryIds = catMatches.map((cat) => cat._id);
    
      query.$or = [
        { title: { $regex: new RegExp(search, "i") } }, 
        { level: { $regex: new RegExp(search, "i") } },
        { job_type: { $regex: new RegExp(search, "i") } },
        { category: { $in: categoryIds } },
      ];
    }

    const totalJobs = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .populate("category")
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

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
