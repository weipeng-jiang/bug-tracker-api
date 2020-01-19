const express = require("express");
const Roles = require("../models/Roles");

const router = express.Router();

router.get("/", (req, res) => {
  Roles.retrieveAll((err, roles) => {
    if (err) return res.json(err);
    return res.json(roles);
  });
});

router.post("/", (req, res) => {
  const role_id = req.body.role_id;
  const role_title = req.body.role_title;

  Roles.insert(role_id, role_title, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
