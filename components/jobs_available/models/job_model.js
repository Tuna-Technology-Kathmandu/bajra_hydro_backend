const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: true,
      trim: true,
    },

    job_category: {
      type: String,
      enum: ['Full-time', 'Part-Time', 'Freelance', 'Contract'],
    },

    career_level: {
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

    deadline: {
      type: Date,
      required: true,
    },

    no_of_vacancy: {
      type: Number,
      required: true,
      min: 1,
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
