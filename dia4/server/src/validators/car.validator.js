const Joi = require("joi");

const carSchema = Joi.object({
  url: Joi.string().required(),
  brandModel: Joi.string().required(),
  year: Joi.string().required(),
  plate: Joi.string().required(),
  color: Joi.string().required(),
});

module.exports = carSchema;
