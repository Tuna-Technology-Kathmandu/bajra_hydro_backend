const Joi = require("joi");

const contactUsValidator = Joi.object({
  fullname: Joi.string()
      .min(3)
      .max(100)
      .required()
      .messages({
        'string.empty': 'Full name is required',
        'string.min': 'Full name must be at least 3 characters',
        'string.max': 'Full name must be at most 100 characters'
      }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address'
    }),

    subject: Joi.string()
    .max(150)
    .allow("")
    .messages({
      "string.max": "Subject must be at most 150 characters",
    }),

  message: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      "string.empty": "Message cannot be empty",
      "string.min": "Message must be at least 10 characters",
      "string.max": "Message must be at most 1000 characters",
    }),

  status: Joi.string()
    .valid("unread", "read", "responded")
    .default("unread")
    .messages({
      "any.only": "Status must be one of unread, read, or responded",
    }),
});

module.exports = contactUsValidator;