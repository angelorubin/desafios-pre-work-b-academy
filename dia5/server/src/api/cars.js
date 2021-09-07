const { Router } = require("express");
const carsRouter = Router();
const multer = require("multer");
const upload = multer();
const { checkSchema, validationResult } = require("express-validator");

// Object to Simulate Data Storage in Memory
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
  return fields.every((field) => typeof field !== "undefined" && field !== "");
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

carsRouter.get("/", (req, res) => {
  res.json(Object.values(data));
});

carsRouter.post(
  "/",
  upload.none(),
  checkSchema({
    url: {
      in: ["body"],
      isEmpty: {
        negated: true,
        errorMessage: "Campo obrigatório.",
      },
      isURL: {
        errorMessage: "Esta não é uma URL válida",
      },
    },
    brandModel: {
      isEmpty: {
        negated: true,
      },
      in: ["body"],
      errorMessage: "Campo obrigatório.",
    },
    year: {
      isEmpty: {
        negated: true,
      },
      in: ["body"],
      errorMessage: "Campo obrigatório.",
    },
    plate: {
      isEmpty: {
        negated: true,
      },
      in: ["body"],
      errorMessage: "Campo obrigatório.",
      in: ["body"],
      custom: {
        options: async (value, { req }) => {
          if (typeof data[req.body.plate.toUpperCase()] !== "undefined") {
            return Promise.reject();
          }
          return Promise.resolve();
        },
        errorMessage: (value) =>
          `Já existe um carro cadastrado com a placa ${value.toUpperCase()}`,
      },
    },
    color: {
      isEmpty: {
        negated: true,
      },
      in: ["body"],
      errorMessage: "Campo obrigatório.",
    },
  }),
  (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.json({ status: false, errors: errors.array() });
      } else {
        const { url, brandModel, year, plate, color } = req.body;

        data[plate.toUpperCase()] = {
          url,
          brandModel,
          year,
          plate: plate.toUpperCase(),
          color,
        };

        res.json({
          status: true,
          message: `O carro com placa ${plate.toUpperCase()} foi cadastrado com sucesso`,
        });
      }
    } catch (error) {
      res.json({ error });
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
