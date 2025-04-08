const Report = require("../models/reportModel");
const reportValidator = require("../helper/reportValidator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });  

// Create a report
const createReport = async (req, res) => {
  try {
    
    const { error, value } = reportValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const fileUrl = req.file?.path || ""; 

    if (!fileUrl) {
      return res.status(400).json({ message: '"file" is required' });
    }

    const newReport = new Report({
      ...value,
      file: fileUrl, 
    });

    await newReport.save();

    return res.status(201).json({
      message: "Report created successfully.",
      newReport,
    });
  } catch (error) {
    console.error("Create Report Error:", error);
    return res.status(500).json({ message: "Server error while creating report" });
  }
};
module.exports = { createReport, upload };
