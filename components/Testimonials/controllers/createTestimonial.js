const Testimonial = require("../models/testimonialModel");
const testimonialValidator = require("../helper/testimonialValidator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const createTestimonial = async (req, res) => {
  try {
    const { error, value } = testimonialValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const photoUrl = req.file?.path || "";

    const newTestimonial = new Testimonial({
      ...value,
      photoUrl,
    });

    await newTestimonial.save();

    return res.status(201).json({
      message: "Testimonial created successfully.",
      newTestimonial,
    });
  } catch (error) {
    console.error("Create Testimonial Error:", error);
    return res.status(500).json({ message: "Server error while creating testimonial" });
  }
};

module.exports = { createTestimonial, upload };
