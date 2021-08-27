const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const {
	validationBody,
	validationResult,
} = require("./src/validations/carScheme");

// Simulate Data Storage in Memory
let data = {};

router.get("/", (req, res) => {
	res.json(Object.values(data));
});

function checkBody(req, res, next) {
	if (areAllFieldsValid(req.body)) {
		return next();
	}

	res
		.status(400)
		.json({ error: true, message: "Todos os campos são obrigatórios" });
}

function areAllFieldsValid(body) {
	const fields = [body.url, body.brandModel, body.year, body.plate, body.color];
	const fieldTestResult = fields.every(
		(field) => typeof field !== "undefined" && field !== " "
	);
	return fieldTestResult;
}

function checkAlreadyRegistered(req, res, next) {
	if (typeof data[req.body.plate.toUpperCase()] !== "undefined") {
		return res.status(400).json({
			error: true,
			message: `Já existe um carro cadastrado com a placa ${req.body.plate}`,
		});
	}
	next();
}

router.post("/", validationBody, upload.none(), (req, res) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				status: false,
				error: { ...errors.mapped() },
			});
		}

		const { url, brandModel, year, plate, color } = req.body;

		data[plate.toUpperCase()] = {
			url,
			brandModel,
			year,
			plate: plate.toUpperCase(),
			color,
		};

		const capitalizedPlate = plate.toUpperCase();

		res.json({
			message: `O carro com placa ${capitalizedPlate} foi cadastrado com sucesso`,
		});
	} catch (error) {}
});

router.put("/:plate", checkBody, (req, res) => {
	const { plate } = req.params;

	if (!areAllFieldsValid(req.body)) {
		res.status(400).json({
			error: true,
			message: "Todos os campos são obrigatórios",
		});

		return;
	}

	delete data[plate];

	data[req.body.plate.toUpperCase()] = {
		image: req.body.image,
		brandModel: req.body.brandModel,
		year: req.body.year,
		plate: req.body.plate,
		color: req.body.color,
	};

	res.json({
		message: `O carro com placa ${plate} foi atualizado com sucesso`,
	});
});

router.delete("/", (req, res) => {
	delete data[req.body.plate.toUpperCase()];
	res.json({
		message: `O carro com placa ${req.body.plate} foi removido com sucesso`,
	});
});

module.exports = router;
