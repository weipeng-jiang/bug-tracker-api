const db = require("../index");

let types = {};

types.retrieveAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM types", (err, result) => {
      if (err.error) return reject(err);
      resolve(result);
    });
  });
};

types.retrieveByTypeId = (type_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM types WHERE type_id=$1",
      [type_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result[0]);
      }
    );
  });
};

module.exports = types;
