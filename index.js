const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const router = require("./utility/apiRoutes");
dotenv.config();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(bcrypt);
const port = process.env.Port || 5000;

app.get("/", (req, res) => {
  res.send("TaskManagement server is up and running!");
});
app.use("/api/v1", router);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`TaskManagement app listening at http://localhost:${port}`);
});
