const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
  {
    vacancy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vacancy",
      required: true,
    },
    cv_url: {
      type: String,
      required: [true, "CV file URL is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CV", cvSchema);
