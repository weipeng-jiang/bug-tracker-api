const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

var db = require("./database");

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/roles", require("./routes/roles"));
app.use("/api/status", require("./routes/status"));
app.use("/api/priority", require("./routes/priority"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/users", require("./routes/users"));
app.use("/api/issues", require("./routes/issues"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/userProjects", require("./routes/userProjects"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

db.query("SELECT NOW()", (err, res) => {
  if (err.error) return console.log(err.error);
  console.log(`PostgreSql connected: ${res[0].now}.`);
});

module.exports = app;
