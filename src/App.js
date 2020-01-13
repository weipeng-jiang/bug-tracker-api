const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./Queries");
const pool = require("./Queries");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/api/", (req, res) => {
  res.json({ info: "Node.js, Express" });
});

app.get("/api/Users", db.getUsers);
app.get("/api/Users/:id", db.getUsersByUser_Id);
app.get(
  "/api/Users/User_fName/:fName/User_lName/:lName",
  db.getUsersByUserName
); // how to query on web browser http://localhost:3000/User_fName=Webber/User_lName=Jiang
app.get("/api/Role_Id/:Role_Id", db.getUserRoleByRole_Id); // how to query on web browser http://localhost:3000/Role_Id=2

app.listen(port, () => {
  console.log("App running on port: 3000");
});
