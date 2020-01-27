const db = require("../");

let userProject = {};

userProject.retrieveAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM user_projects", (err, result) => {
      if (err.error) return reject(err);
      resolve(result);
    });
  });
};

userProject.retrieveByUserId = user_id => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM user_projects WHERE user_id=$1",
      [user_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

userProject.retrieveByProjectId = project_id => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM user_projects WHERE project_id=$1",
      [project_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

userProject.retrieveByUserAndProjectId = (user_id, project_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM user_projects WHERE user_id=$1 AND project_id=$2",
      [user_id, project_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

userProject.insert = (user_id, project_id, user_assign_date) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO user_projects (user_id, project_id, user_assign_date) VALUES ($1, $2, $3)`,
      [user_id, project_id, user_assign_date],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

userProject.update = (user_id, project_id, user_exit_date) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE user_projects SET user_exit_date=$3 WHERE user_id=$1 AND project_id=$2`,
      [user_id, project_id, user_exit_date],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = userProject;
