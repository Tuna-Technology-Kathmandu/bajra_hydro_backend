const Joi = require("joi");

const jobValidator = Joi.object({

  career_level: Joi.string()
    .valid("Entry Level", "Mid Level", "Junior Level", "Senior Level")
    .required()
    .messages({
      "any.only": "Career level must be Entry, Mid, Junior or Senior Level",
      "string.empty": "Career level is required",
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
    category: Joi.string().required().messages({
      "string.empty": "Category name is required"
    }),
    
  status: Joi.string()
    .valid("pending", "approved")
    .optional(),
});

module.exports = jobValidator;
