const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: true,
      trim: true,
    },

    jobCategory: {
      type: String,
      enum: ['Full-time', 'Part-Time', 'Freelance', 'Contract'],
    },

    careerLevel: {
      type: String,
      enum: ['Entry Level', 'Mid Level', 'Junior Level', 'Senior Level'],
    },

    location: {
      type: String,
      enum: ['On-site', 'Remote', 'Hybrid'],
    },

    description: {
      type: String,
      required: true,
    },

    postedDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending',  
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
