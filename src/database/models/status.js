const db = require("../index");

let status = {};

status.retrieveAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM status", (err, results) => {
      if (err.error) return reject(err);
      resolve(results);
    });
  });
};

module.exports = status;
