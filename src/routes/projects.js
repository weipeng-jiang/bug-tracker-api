const express = require("express");
const projects = require("../database/models/projects");
const humps = require("humps");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await projects.retrieveAll();
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/:project_id", async (req, res) => {
  const project_id = req.params.project_id;
  try {
    const result = await projects.retrieveById(project_id);
    if (!result) {
      return res.status(404).sendStatus(404);
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.post("/", async (req, res) => {
  const { project_name, description, date_created } = req.body;

  try {
    await projects.createNewProject(project_name, description, date_created);
    res.status(201).sendStatus(201);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.patch("/:project_id", async (req, res) => {
  const { project_name, description } = req.body;
  const project_id = req.params.project_id;

  try {
    const foundId = await projects.retrieveById(project_id);
    if (!foundId) {
      return res.status(404).json({ message: "Project ID not found" });
    }
    await projects.updateProject(project_name, description, project_id);
    res
      .status(200)
      .json(humps.camelizeKeys(await projects.retrieveById(project_id)));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.delete("/:project_id", async (req, res) => {
  const project_id = req.params.project_id;
  try {
    const result = await projects.retrieveById(project_id);
    if (!result) {
      return res.status(404).json({ message: "Project ID is not found" });
    }
    await projects.deleteProject(project_id);
    res.status(200).sendStatus(200);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

module.exports = router;
