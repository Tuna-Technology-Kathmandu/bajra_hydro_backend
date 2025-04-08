const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    jobCategory: {
      type: String,
      required: true,
    },
    careerLevel: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    availabilty: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);


module.exports = mongoose.model('Report', reportSchema);
