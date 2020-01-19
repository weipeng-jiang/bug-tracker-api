const db = require("../database/Index");

class Roles {
  static retrieveAll(callback) {
    db.query("SELECT * from roles", (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static insert(role_id, role_title, callback) {
    db.query(
      "INSERT INTO roles (role_id, role_title) VALUES ($1, $2)",
      [role_id, role_title],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}

module.exports = Roles;
