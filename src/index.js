const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

var db = require("./database/Index");

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/roles", require("./api/Roles"));
app.use("/api/status", require("./api/Status"));
app.use("/api/priority", require("./api/Priority"));
app.use("/api/projects", require("./api/Projects"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

db.query("SELECT NOW()", (err, res) => {
  if (err.error) return console.log(err.error);
  console.log(`PostgreSql connected: ${res[0].now}.`);
});

module.exports = app;
