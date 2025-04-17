const Job = require("../models/job_model");

const getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.error("Get Single Job Error:", error);
    return res.status(500).json({ message: "Failed to retrieve job" });
  }
};

module.exports = getSingleJob;
