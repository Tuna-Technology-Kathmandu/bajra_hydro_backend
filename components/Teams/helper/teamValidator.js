const Joi = require("joi");

const teamValidator = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name must be at most 100 characters",
    }),

  salutation: Joi.string()
    .valid("Mr.", "Ms.", "Mrs.", "Dr.", "Prof.")
    .required()
    .messages({
      "any.only": "Salutation must be one of Mr., Ms., Mrs., Dr., or Prof.",
      "string.empty": "Salutation is required",
    }),

  designation: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Designation is required",
      "string.min": "Designation must be at least 2 characters",
      "string.max": "Designation must be at most 100 characters",
    }),

  contactNo: Joi.string()
    .pattern(/^[+]?[\d\s\-()]{7,20}$/)
    .required()
    .messages({
      "string.empty": "Contact number is required",
      "string.pattern.base": "Invalid contact number format",
    }),

  photoUrl: Joi.string()
    .uri()
    .allow("")
    .messages({
      "string.uri": "Photo must be a valid URL",
    }),
});

module.exports = teamValidator;
