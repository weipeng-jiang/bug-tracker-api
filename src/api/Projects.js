const express = require("express");
const Projects = require("../models/Projects");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.retrieveAll((err, priority) => {
    if (err) return res.json(err);
    return res.json(priority);
  });
});

router.get("/project_id=:project_id", (req, res) => {
  const project_id = req.params.project_id;

  Projects.retrieveByProject_Id(project_id, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
