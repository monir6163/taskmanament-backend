const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
const port = process.env.Port || 5000;

app.get("/", (req, res) => {
  res.send("TaskManagement server is up and running!");
});

//error handling middleware function for all routes
app.use((err, req, res, next) => {
  console.log(err);
  const message = err.message ? err.message : "Server Error Occurred";
  const status = err.status ? err.status : 500;
  res.status(status).json({
    message,
  });
});

app.listen(port, () => {
  console.log(`TaskManagement app listening at http://localhost:${port}`);
});
