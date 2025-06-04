const CV = require("../models/cv_model");
const cvValidation = require("../helper/cv_validator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const addCV = async (req, res) => {
  try {
    const { error, value } = cvValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "CV file is required" });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    const newCV = new CV({
      vacancy: value.vacancy,
      cv_url: req.file.path,
    });

    await newCV.save();

    return res.status(201).json({
      message: "CV uploaded successfully",
      cv: newCV,
    });
  } catch (err) {
    console.error("Add CV Error:", err);
    return res.status(500).json({ message: "Server error while uploading CV" });
  }
};

module.exports = { addCV, upload };
