const Job = require("../models/job_model");
const jobValidation = require("../helper/job_validator");

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = jobValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.set({ ...value });
    
    job.status = "pending";  

    await job.save();

    return res.status(200).json({
      message: "Job updated successfully.",
      job,
    });
  } catch (error) {
    console.error("Update Job Error:", error);
    return res.status(500).json({ message: "Error updating job" });
  }
};

module.exports = updateJob;
