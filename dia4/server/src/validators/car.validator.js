const Joi = require("joi");

const carSchema = Joi.object({
	url: Joi.string().required(),
});

module.exports = carSchema;
