const db = require("..");

let userIssues = {};

userIssues.retrieveAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM userIssues", (err, result) => {
      if (err.error) return reject(err);
      resolve(result);
    });
  });
};

userIssues.retrieveByUserId = user_id => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM userIssues WHERE user_id=$1",
      [user_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

userIssues.retrieveByIssueId = issue_id => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM userIssues WHERE issue_id=$1",
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
      "SELECT * FROM userIssues WHERE user_id=$1 AND issue_id=$2",
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
      `INSERT INTO userIssues (user_id, issue_id) VALUES ($1, $2)`,
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
      `DELETE FROM userIssues WHERE user_id=$1 AND issue_id=$2`,
      [user_id, issue_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result[0]);
      }
    );
  });
};

module.exports = userIssues;
