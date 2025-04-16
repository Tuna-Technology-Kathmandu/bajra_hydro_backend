const Joi = require("joi");

const jobValidator = Joi.object({
  position: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Position is required",
      "string.min": "Position must be at least 3 characters",
      "string.max": "Position must not exceed 100 characters",
    }),

  job_category: Joi.string()
    .valid("Full-time", "Part-Time", "Freelance", "Contract")
    .required()
    .messages({
      "any.only": "Job category must be one of Full-time, Part-Time, Freelance, or Contract",
      "string.empty": "Job category is required",
    }),

  career_level: Joi.string()
    .valid("Entry Level", "Mid Level", "Junior Level", "Senior Level")
    .required()
    .messages({
      "any.only": "Career level must be Entry, Mid, Junior or Senior Level",
      "string.empty": "Career level is required",
    }),

  location: Joi.string()
    .valid("On-site", "Remote", "Hybrid")
    .required()
    .messages({
      "any.only": "Location must be On-site, Remote, or Hybrid",
      "string.empty": "Location is required",
    }),

  description: Joi.string()
    .required()
    .messages({
      "string.empty": "Description is required",
    }),

  deadline: Joi.date()
    .greater("now")
    .required()
    .messages({
      "date.greater": "Deadline must be a future date",
      "date.base": "Deadline must be a valid date",
      "any.required": "Deadline is required",
    }),

  no_of_vacancy: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Number of vacancies must be a number",
      "number.min": "There must be at least 1 vacancy",
      "any.required": "Number of vacancies is required",
    }),

  status: Joi.string()
    .valid("pending", "approved")
    .optional(),
});

module.exports = jobValidator;
