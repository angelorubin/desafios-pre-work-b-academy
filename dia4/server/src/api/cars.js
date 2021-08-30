const { Router } = require("express");
const carsRouter = Router();
const multer = require("multer");
const upload = multer();
const { check, oneOf, validationResult } = require("express-validator");

// Simulate Data Storage in Memory
let data = {};

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
    res.json({
      error: true,
      message: `Já existe um carro cadastrado com a placa ${req.body.plate}`,
    });
  }
  next();
}

carsRouter.get("/", (req, res) => {
  res.json(Object.values(data));
});

carsRouter.post(
  "/",
  upload.none(),
  [
    check("url")
      .notEmpty()
      .withMessage("campo obrigatório")
      .isURL()
      .withMessage("url inválido"),
    check("brandModel").notEmpty().withMessage("campo obrigatório"),
    check("year").notEmpty().withMessage("campo obrigatório"),
    check("plate")
      .notEmpty()
      .withMessage("campo obrigatório")
      .custom((value) => {
        if (data[value.toUpperCase()] === value) {
          console.log("Plate Exists");
          return Promise.reject();
        }
      })
      .withMessage(`Esta placa já esta cadastrada`),
    check("color").notEmpty().withMessage("campo obrigatório"),
  ],
  (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.json({
          status: false,
          errors: errors.mapped(),
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

      res.status(200).json({
        status: true,
        message: `O carro com placa ${plate.toUpperCase()} foi cadastrado com sucesso`,
      });
    } catch (error) {
      res.status(400).json({ err });
    }
  }
);

carsRouter.put("/:plate", checkBody, (req, res) => {
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

carsRouter.delete("/", (req, res) => {
  delete data[req.body.plate.toUpperCase()];
  res.json({
    message: `O carro com placa ${req.body.plate} foi removido com sucesso`,
  });
});

module.exports = {
  carsRouter,
};
