const Joi = require("joi");
const mongoose = require("mongoose");

const vacancyValidationSchema = Joi.object({
  title: Joi.string().trim().required(),
  category: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Invalid category ID");
      }
      return value;
    })
    .required(),
  description: Joi.string().required(),
  level: Joi.string()
    .valid("Entry-Level", "Mid-Level", "Senior-Level", "Manager", "Executive")
    .required(),
  no_of_vacancy: Joi.number().integer().min(1).default(1),
  location: Joi.string().trim().required(),
  job_type: Joi.string()
    .valid("Full-time", "Part-time", "Contract", "Temporary", "Internship")
    .required(),
  salary: Joi.string().trim().optional(),
  requirements: Joi.array().items(Joi.string()).default([]),
  benefits: Joi.array().items(Joi.string()).default([]),
  application_deadline: Joi.date().optional(),
  posted_date: Joi.date().optional(),
  is_active: Joi.boolean().default(true),
});

module.exports = vacancyValidationSchema;
