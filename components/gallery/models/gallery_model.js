const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
<<<<<<< HEAD
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
=======
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["image", "video"],
      required: [true, "Type is required"],
    },
    image: {
      type: String,
      trim: true,
      default: null,
    },
      video_url: {
      type: String,
      trim: true,
      default: null, 
    },
    video_id: {
      type: String,
      trim: true,
      default: null, 
>>>>>>> abishek
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

<<<<<<< HEAD
=======
gallerySchema.pre("save", function (next) {
  if (this.video_url) {
    const match = this.video_url.match(
      /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    this.video_id = match ? match[1] : null;
  }
  next();
});

>>>>>>> abishek
module.exports = mongoose.model("Gallery", gallerySchema);
