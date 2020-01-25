const express = require("express");
const Priority = require("../models/Priority");

const router = express.Router();

router.get("/", (req, res) => {
  Priority.retrieveAll((err, priority) => {
    if (err) return res.json(err);
    return res.json(priority);
  });
});

router.get("/priority_id=:priority_id", (req, res) => {
  const priority_id = req.params.priority_id;

  Priority.retrieveByPriority_Id(priority_id, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.get("/priority_type=:priority_type", (req, res) => {
  const priority_type = req.params.priority_type;

  Priority.retrieveByPriority_type(priority_type, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
