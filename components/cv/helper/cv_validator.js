const Joi = require("joi");

const cvValidation = Joi.object({
  vacancy: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.empty": "Vacancy ID is required",
      "string.pattern.base": "Invalid Vacancy ID format",
    }),
});

module.exports = cvValidation;
