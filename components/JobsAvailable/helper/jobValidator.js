const Joi = require("joi");

const jobValidation = Joi.object({
  position: Joi.string().min(5).max(150).required().messages({
    "string.empty": "Position is required",
    "string.min": "Position must be at least 5 characters",
    "string.max": "Position must not exceed 150 characters"
  }),

  jobCategory: Joi.string().valid('Full-time', 'Part-Time', 'Freelance', 'Contract').required().messages({
    "string.empty": "Job category is required",
    "any.only": "Job category must be one of 'Full-time', 'Part-Time', 'Freelance', or 'Contract'"
  }),

  careerLevel: Joi.string().valid('Entry Level', 'Mid Level', 'Junior Level', 'Senior Level').required().messages({
    "string.empty": "Career level is required",
    "any.only": "Career level must be one of 'Entry Level', 'Mid Level', 'Junior Level', or 'Senior Level'"
  }),

  location: Joi.string().valid('On-site', 'Remote', 'Hybrid').required().messages({
    "string.empty": "Location is required",
    "any.only": "Location must be one of 'On-site', 'Remote', or 'Hybrid'"
  }),  

  description: Joi.string().min(20).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 20 characters"
  }),

});

module.exports = jobValidation;
