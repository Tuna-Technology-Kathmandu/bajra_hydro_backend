const Testimonial = require("../models/testimonialModel");
const testimonialValidator = require("../helper/testimonialValidator");

// Create a testimonial
const createTestimonial = async (req, res) => {
  try {
    const { error, value } = testimonialValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newTestimonial = new Testimonial({ ...value });
    await newTestimonial.save();

    return res.status(201).json({ message: "Testimonial created successfully." });
  } catch (error) {
    console.error("Create Testimonial Error:", error);
    return res.status(500).json({ message: "Server error while creating testimonial" });
  }
};

module.exports = createTestimonial;
