const { checkSchema, validationResult } = require("express-validator");

const validationBody = checkSchema({
	url: {
		isLength: { options: { min: 3 } },
		in: ["body"],
		errorMessage: "campo obrigatório",
	},
});

module.exports = {
	validationBody,
	validationResult,
};
