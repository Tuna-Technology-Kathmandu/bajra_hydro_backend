// const Job = require("../models/jobModel");

// const verifyJob = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const job = await Job.findById(id);
//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }

//     job.status = "approved";
//     await job.save();

//     return res.status(200).json({
//       message: "Job approved successfully",
//       job,
//     });
//   } catch (error) {
//     console.error("Verify Job Error:", error);
//     return res.status(500).json({ message: "Error approving job" });
//   }
// };

// module.exports = verifyJob;
