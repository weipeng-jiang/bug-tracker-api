const db = require("../index");

let projects = {};

projects.retrieveAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM projects", (err, result) => {
      if (err.error) return reject(err);
      resolve(result);
    });
  });
};

projects.retrieveById = (project_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM projects WHERE project_id=$1`,
      [project_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result[0]);
      }
    );
  });
};

projects.createNewProject = (project_name, description, date_created) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO projects (project_name, description, date_created) VALUES ($1, $2, $3)`,
      [project_name, description, date_created],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

projects.updateProject = (project_name, description, project_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE projects SET project_name=$1, description=$2 WHERE project_id=$3`,
      [project_name, description, project_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

projects.deleteProject = (project_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM projects WHERE project_id=$1",
      [project_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = projects;
