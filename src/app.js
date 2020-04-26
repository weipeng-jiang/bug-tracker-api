const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up Auth0 configuration
const authConfig = {
  domain: "dev-5j3doydu.au.auth0.com",
  audience: "http://localhost:3001",
};

// Define middleware that validates incoming bearer tokens
// using JWKS from dev-5j3doydu.au.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"],
});

app.use("/api/roles", require("./routes/roles"));
app.use("/api/status", require("./routes/status"));
app.use("/api/priority", require("./routes/priority"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/users", require("./routes/users"));
app.use("/api/issues", require("./routes/issues"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/userProjects", require("./routes/userProjects"));
app.use("/api/userIssues", require("./routes/userIssues"));

// app.use("/api/userIssues", checkJwt, require("./routes/userIssues"));

module.exports = app;
