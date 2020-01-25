const db = require("../database/Index");

class Projects {
  static retrieveAll(callback) {
    db.query("SELECT * from projects", (err, res) => {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static retrieveByProject_Id(project_id, callback) {
    db.query(
      `SELECT * FROM projects WHERE project_id=${project_id}`,
      (err, res) => {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}

module.exports = Projects;
