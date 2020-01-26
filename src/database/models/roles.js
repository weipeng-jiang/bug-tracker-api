const db = require("../index");

let roles = {};

roles.retrieveAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM roles", (err, result) => {
      if (err.error) return reject(err);
      resolve(result);
    });
  });
};

roles.retrieveById = role_id => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM roles WHERE role_id=$1`,
      [role_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result[0]);
      }
    );
  });
};

roles.createNewRole = (role_id, role_title) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO roles VALUES ($1, $2)`,
      [role_id, role_title],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

roles.updateRole = (role_title, role_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE roles SET role_title = $1 WHERE role_id = $2`,
      [role_title, role_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

roles.deleteRole = role_id => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM roles WHERE role_id=$1`, [role_id], (err, result) => {
      if (err.error) return reject(err);
      resolve(result[0]);
    });
  });
};
module.exports = roles;
