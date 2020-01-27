const db = require("../");

let comment = {};

comment.retrieveAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM comments", (err, result) => {
      if (err.error) return reject(err);
      resolve(result);
    });
  });
};

comment.retrieveById = comment_id => {
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

comment.createNewComment = (issue_id, user_id, description, comment_date) => {
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

comment.updateComment = (description, edit_date, comment_id) => {
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

comment.deleteComment = comment_id => {
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

module.exports = comment;
