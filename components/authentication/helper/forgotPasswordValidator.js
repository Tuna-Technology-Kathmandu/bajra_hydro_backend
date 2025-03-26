const Joi = require("joi");

const forgotPasswordValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address"
  })
});

module.exports = { forgotPasswordValidation };
