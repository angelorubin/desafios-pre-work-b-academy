const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3333;
const { apiRouter } = require("./src/api");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*
app.get("/", (req, res) => {
  res.json({ message: "B. Academy Cars API" });
});
*/

app.use("/", apiRouter);

app.listen(port, () => {
  console.log("Listening on port http://localhost:%d", port);
});
