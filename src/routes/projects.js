const express = require("express");
const projects = require("../database/models/projects");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await projects.retrieveAll();
    res.status(200).json(result);
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
    res.status(200).json(result);
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

//TODO? PATCH request to edit title and description of project

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
