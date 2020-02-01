const Pool = require("pg").Pool;
const pool = new Pool({
  host: "rosie.db.elephantsql.com",
  user: "fpirroxt",
  database: "fpirroxt",
  password: "bRuA9HLENn3rxNNW_uzFJ2A0bUQw0oEO",
  port: 5432
});

const getUsers = (req, res) => {
  pool.query("SELECT * FROM Users", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getUsersByUser_Id = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    "SELECT * FROM Users WHERE User_Id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getUserRoleByRole_Id = (req, res) => {
  const Role_Id = parseInt(req.params.Role_Id);
  pool.query(
    "SELECT * FROM Users INNER JOIN Roles ON Users.Role_Id=Roles.Role_Id WHERE Users.Role_Id=$1",
    [Role_Id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getUsersByUserName = (req, res) => {
  const fName = req.params.fName;
  const lName = req.params.lName;

  pool.query(
    "SELECT * FROM Users WHERE User_fName = $1 AND User_lName=$2",
    [fName, lName],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getUsers,
  pool,
  getUsersByUser_Id,
  getUsersByUserName,
  getUserRoleByRole_Id
};
