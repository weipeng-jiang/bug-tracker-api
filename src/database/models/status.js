const db = require("../index");

let status = {};

status.retrieveAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM status", (err, result) => {
      if (err.error) return reject(err);
      resolve(result);
    });
  });
};

status.retrieveById = status_id => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM status WHERE status_id=$1",
      [status_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result[0]);
      }
    );
  });
};

module.exports = status;
