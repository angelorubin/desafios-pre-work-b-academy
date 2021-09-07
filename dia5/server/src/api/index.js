const { Router } = require("express");
const { carsRouter } = require("./cars");
const { usersRouter } = require("./users");

const apiRouter = Router();

apiRouter.use("/cars", carsRouter);
apiRouter.use("/users", usersRouter);

module.exports = {
  apiRouter,
};
