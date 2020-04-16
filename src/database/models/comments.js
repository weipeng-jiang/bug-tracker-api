const db = require("../");

let comments = {};

comments.retrieveAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM comments", (err, result) => {
      if (err.error) return reject(err);
      resolve(result);
    });
  });
};

comments.retrieveByCommentId = (comment_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM comments WHERE comment_id=$1",
      [comment_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result[0]);
      }
    );
  });
};

comments.retrieveCommentsByIssueId = (issue_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM comments WHERE issue_id=$1",
      [issue_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

comments.createNewComment = (issue_id, user_id, description, comment_date) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO comments (issue_id, user_id, description, comment_date) VALUES ($1, $2, $3, $4)`,
      [issue_id, user_id, description, comment_date],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

comments.updateComment = (description, edit_date, comment_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE comments SET description=$1, edit_date=$2 WHERE comment_id=$3`,
      [description, edit_date, comment_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

comments.deleteComment = (comment_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM comments WHERE comment_id=$1`,
      [comment_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result[0]);
      }
    );
  });
};

module.exports = comments;
