const Job = require("../models/job_model");

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Job.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Job not found" });
    }

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
