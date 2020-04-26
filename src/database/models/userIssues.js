const db = require("..");

let userIssues = {};

userIssues.retrieveAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM user_issues", (err, result) => {
      if (err.error) return reject(err);
      resolve(result);
    });
  });
};

userIssues.retrieveByUserId = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM user_issues WHERE user_id=$1",
      [user_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

userIssues.retrieveByIssueId = (issue_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM user_issues WHERE issue_id=$1",
      [issue_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

userIssues.retrieveByUserAndIssueId = (user_id, issue_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM user_issues WHERE user_id=$1 AND issue_id=$2",
      [user_id, issue_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

userIssues.assignUserToIssue = (user_id, issue_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO user_issues (user_id, issue_id) VALUES ($1, $2)`,
      [user_id, issue_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

userIssues.removeUserFromIssue = (user_id, issue_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM user_issues WHERE user_id=$1 AND issue_id=$2`,
      [user_id, issue_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result[0]);
      }
    );
  });
};

module.exports = userIssues;
