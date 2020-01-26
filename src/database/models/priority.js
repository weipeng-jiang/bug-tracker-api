const db = require("../index");

let priority = {};

priority.retrieveAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM priority", (err, result) => {
      if (err.error) return reject(err);
      resolve(result);
    });
  });
};

priority.retrieveById = priority_id => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM priority WHERE priority_id=$1`,
      [priority_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result[0]);
      }
    );
  });
};

module.exports = priority;
