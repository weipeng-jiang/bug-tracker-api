const db = require("../database");

class Status {
  static retrieveAll(callback) {
    db.query("SELECT * FROM status", (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static retrieveByStatus_Id(status_id, callback) {
    db.query("SELECT * FROM status WHERE status_id=$1"),
      [status_id],
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      };
  }
}

module.exports = Status;
