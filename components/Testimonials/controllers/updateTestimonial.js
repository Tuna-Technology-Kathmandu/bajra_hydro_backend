const Testimonial = require("../models/testimonialModel");
const testimonialValidator = require("../helper/testimonialValidator");

// Update a testimonial by ID
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = testimonialValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updated = await Testimonial.findByIdAndUpdate(id, value, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    return res.status(200).json({
      message: "Testimonial updated successfully",
      updated,
    });
  } catch (error) {
    console.error("Update Testimonial Error:", error);
    return res.status(500).json({ message: "Failed to update testimonial" });
  }
};

module.exports = updateTestimonial;
