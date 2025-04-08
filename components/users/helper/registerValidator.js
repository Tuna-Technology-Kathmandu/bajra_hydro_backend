const Joi = require('joi');

const registerValidation = Joi.object({
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

  password: Joi.string()
    .min(8)
    .max(128)
    .required()
    .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d@$.!%*#?&]{6,}$'))
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.max': 'Password must be at most 128 characters',
      'string.pattern.base': 'Password must contain at least one letter and one number'
    }),

  role: Joi.string()
    .valid('admin', 'editor', 'subscriber')
    .optional()
    .messages({
      'any.only': 'Role must be admin, editor, or subscriber'
    }),

  securityData: Joi.object({
    questions: Joi.array()
      .items(
        Joi.object({
          question: Joi.string().required().messages({
            'string.empty': 'Each question must be a valid string'
          }),
          answer: Joi.string().min(1).required().messages({
            'string.empty': 'Answer to each question is required'
          })
        })
      )
      .length(3)
      .required()
      .messages({
        'array.length': 'Exactly 3 security questions and answers must be provided.',
        'array.base': 'Questions must be an array of objects with question and answer.'
      })
  }).required().messages({
    'any.required': 'Security questions must be provided.'
  })
});

module.exports = registerValidation;
