const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Testimonial message is required"],
      trim: true,
      maxlength: [1000, "Description must be at most 1000 characters"],
    },
    photoUrl: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
