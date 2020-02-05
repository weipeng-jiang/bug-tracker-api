const db = require("../");

let assignees = {};

assignees.retrieveAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM assignees", (err, result) => {
      if (err.error) return reject(err);
      resolve(result);
    });
  });
};

assignees.retrieveByUserId = user_id => {
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

assignees.retrieveByIssueId = issue_id => {
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

assignees.retrieveByUserAndIssueId = (user_id, issue_id) => {
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

assignees.assignUserToIssue = (user_id, issue_id) => {
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

assignees.removeUserFromIssue = (user_id, issue_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM assignees WHERE user_id=$1 AND issue_id=$2`,
      [user_id, issue_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result[0]);
      }
    );
  });
};

module.exports = assignees;
