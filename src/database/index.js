const { Pool } = require("pg");

const CONNECTION_STRING =
  process.env.DATABASE_URL ||
  "postgres://fpirroxt:bRuA9HLENn3rxNNW_uzFJ2A0bUQw0oEO@rosie.db.elephantsql.com:5432/fpirroxt";
const SSL = process.env.NODE_ENV === "production";

const pool = new Pool({ connectionString: CONNECTION_STRING, ssl: SSL });

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle PostgreSQL client.", err);
  process.exit(-1);
});

pool.query = (query, ...args) => {
  pool.connect((err, client, done) => {
    if (err) throw err;
    const params = args.length === 2 ? args[0] : [];
    const callback = args.length === 1 ? args[0] : args[1];

    client.query(query, params, (err, res) => {
      done();
      if (err) {
        console.log(err.stack);
        return callback({ error: "Database error." }, null);
      }
      callback({}, res.rows);
    });
  });
};

module.exports = pool;
