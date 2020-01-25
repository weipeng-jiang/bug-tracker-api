const db = require("../index");

let roles = {};

roles.retrieveAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM roles", (err, results) => {
      if (err.error) return reject(err);
      resolve(results);
    });
  });
};

roles.retrieveById = role_id => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM roles WHERE role_id=$1`,
      [role_id],
      (err, results) => {
        if (err.error) return reject(err);
        resolve(results[0]);
      }
    );
  });
};

roles.createNewRole = (role_id, role_title) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO roles VALUES ($1, $2)`,
      [role_id, role_title],
      (err, results) => {
        if (err.error) return reject(err);
        resolve(results);
      }
    );
  });
};

module.exports = roles;
