const Joi = require("joi");

const reportValidator = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title must not exceed 100 characters",
    }),

  description: Joi.string()
    .max(500)
    .messages({
        "string.max": "Title must not exceed 500 characters",
    }),


});

module.exports = reportValidator;
