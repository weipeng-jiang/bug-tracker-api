const db = require("../");

let assignee = {};

assignee.retrieveAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM assignees", (err, result) => {
      if (err.error) return reject(err);
      resolve(result);
    });
  });
};

assignee.retrieveByUserId = user_id => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM assignees WHERE user_id=$1",
      [user_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

assignee.retrieveByIssueId = issue_id => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM assignees WHERE issue_id=$1",
      [issue_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

assignee.retrieveByUserAndIssueId = (user_id, issue_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM assignees WHERE user_id=$1 AND issue_id=$2",
      [user_id, issue_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

assignee.assignUserToIssue = (user_id, issue_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO assignees (user_id, issue_id) VALUES ($1, $2)`,
      [user_id, issue_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

// TODO: create DELETE endpoint

module.exports = assignee;
