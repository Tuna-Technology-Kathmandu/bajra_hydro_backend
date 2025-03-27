const Testimonial = require("../models/testimonialModel");

// Get all testimonials
const listAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    return res.status(200).json(testimonials);
  } catch (error) {
    console.error("List Testimonials Error:", error);
    return res.status(500).json({ message: "Failed to fetch testimonials" });
  }
};

module.exports = listAllTestimonials;
