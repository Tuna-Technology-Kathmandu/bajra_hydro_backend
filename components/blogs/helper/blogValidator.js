const Joi = require("joi");

const blogValidation = Joi.object({
  title: Joi.string().min(5).max(150).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 5 characters",
    "string.max": "Title must not exceed 150 characters"
  }),
  content: Joi.string().min(20).required().messages({
    "string.empty": "Content is required",
    "string.min": "Content must be at least 20 characters"
  }),
  author: Joi.string().required().messages({
    "string.empty": "Author is required"
  }),
  categories: Joi.array().items(Joi.string()).required().messages({
    "any.required": "At least one category is required"
  }),
  tags: Joi.array().items(Joi.string()).required().messages({
    "any.required": "At least one tag is required"
  }),

});
module.exports = blogValidation;
