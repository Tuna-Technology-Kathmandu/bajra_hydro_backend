const Job = require("../models/jobModel");

// Delete a job by ID
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    // Attempt to delete the job by its ID
    const deleted = await Job.findByIdAndDelete(id);

    // If no job is found, return a 404 error
    if (!deleted) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Return success response if job was deleted
    return res.status(200).json({
      message: "Job deleted successfully",
      deleted,
    });
  } catch (error) {
    console.error("Delete Job Error:", error);
    return res.status(500).json({ message: "Failed to delete job" });
  }
};

module.exports = deleteJob;
