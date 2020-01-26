const db = require("../index");

let project = {};

project.retrieveAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM projects", (err, result) => {
      if (err.error) return reject(err);
      resolve(result);
    });
  });
};

project.retrieveById = project_id => {
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

project.createNewProject = (project_name, description, date_created) => {
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

//TODO update

project.deleteProject = project_id => {
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

module.exports = project;

// INSERT INTO projects (project_name, description, date_created) VALUES ('sun', 'Chasing the sun', '2004-10-19 08:23:54 +0000');
