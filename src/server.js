var db = require("./database");
const app = require("./app");

console.log("Hello");

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

db.query("SELECT NOW()", (err, res) => {
  if (err.error) return console.log(err.error);
  console.log(`PostgreSql connected: ${res[0].now}.`);
});

module.exports = server;
