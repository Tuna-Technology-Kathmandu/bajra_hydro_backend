const Joi = require("joi");

const missionVisionValidation = Joi.object({
  mission: Joi.string().min(5).required().messages({
    "string.empty": "Mission is required",
    "string.min": "Mission must be at least 5 characters"
  }),
  mission_description: Joi.string().min(20).required().messages({
    "string.empty": "Mission description is required",
    "string.min": "Mission description must be at least 10 characters"
  }),
  vision: Joi.string().min(5).required().messages({
    "string.empty": "Vision is required",
    "string.min": "Vision must be at least 5 characters"
  }),
  vision_description: Joi.string().min(20).required().messages({
    "string.empty": "Vision description is required",
    "string.min": "Vision description must be at least 10 characters"
  })
});

module.exports = missionVisionValidation;
