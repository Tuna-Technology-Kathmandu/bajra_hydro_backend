const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    career_level: {
      type: String,
      enum: ['Entry Level', 'Mid Level', 'Junior Level', 'Senior Level'],
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
