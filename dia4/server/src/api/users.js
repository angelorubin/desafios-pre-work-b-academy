const { Router } = require("express");
const usersRouter = Router();

usersRouter.get("/", (req, res) => {
  res.json({ message: "users route ok" });
});

module.exports = { usersRouter };
