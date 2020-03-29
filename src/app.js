const express = require("express");
const bodyParser = require("body-parser");

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
app.use("/api/userIssues", require("./routes/userIssues"));

module.exports = app;
