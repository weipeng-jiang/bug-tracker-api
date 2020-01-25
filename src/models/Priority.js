const db = require("../database/Index");

class Priority {
  static retrieveAll(callback) {
    db.query("SELECT * FROM priority", (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static retrieveByPriority_Id(priority_id, callback) {
    db.query(
      `SELECT * FROM priority WHERE priority_id=B'${priority_id}'`,
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrieveByPriority_type(priority_type, callback) {
    db.query(
      `SELECT * FROM priority WHERE priority_type='${priority_type}'`,
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}

module.exports = Priority;
