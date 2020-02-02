const db = require("../index");

let user = {};

user.retrieveAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users", (err, result) => {
      if (err.error) return reject(err);
      resolve(result);
    });
  });
};

user.retrieveById = user_id => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE user_id=$1",
      [user_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result[0]);
      }
    );
  });
};

user.createNewUser = (
  role_id,
  user_fName,
  user_lName,
  email,
  password,
  last_login
) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users (role_id, user_fName, user_lName, email, password, last_login) VALUES ($1, $2, $3, $4, $5, $6)`,
      [role_id, user_fName, user_lName, email, password, last_login],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

user.retrieveEmailAndPassword = email => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT email, password FROM users WHERE email=$1`,
      [email],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result[0]);
      }
    );
  });
};

user.userLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE email=$1 AND password=$2`,
      [email, password],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

user.updateUser = (
  role_id,
  user_fName,
  user_lName,
  email,
  password,
  user_id
) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users SET role_id=$1, user_fName=$2, user_lName=$3, email=$4, password=$5 WHERE user_id=$6`,
      [role_id, user_fName, user_lName, email, password, user_id],
      (err, result) => {
        if (err.error) return reject(err);
        resolve(result);
      }
    );
  });
};

user.deleteUser = user_id => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM users WHERE user_id=$1`, [user_id], (err, result) => {
      if (err.error) return reject(err);
      resolve(result[0]);
    });
  });
};

module.exports = user;
