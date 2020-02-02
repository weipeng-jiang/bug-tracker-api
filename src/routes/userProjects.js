const express = require("express");
const userProject = require("../database/models/userProjects");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await userProject.retrieveAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/user/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const result = await userProject.retrieveByUserId(user_id);
    if (!result) {
      return res.status(404).json({ message: "User ID not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/project/:project_id", async (req, res) => {
  const project_id = req.params.project_id;

  try {
    const result = await userProject.retrieveByProjectId(project_id);
    if (!result) {
      return res.status(404).json({ message: "Project ID not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/:user_id/:project_id", async (req, res) => {
  const { user_id, project_id } = req.params;

  try {
    const result = await userProject.retrieveByUserAndProjectId(
      user_id,
      project_id
    );
    if (!result) {
      return res
        .status(404)
        .json({ message: "User ID or Project ID not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.post("/", async (req, res) => {
  const { user_id, project_id } = req.body;

  try {
    await userProject.assignUserToProject(
      user_id,
      project_id,
      new Date().toUTCString()
    );
    res.status(201).sendStatus(201);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.patch("/:user_id/:project_id", async (req, res) => {
  const { user_id, project_id } = req.params;

  try {
    const result = await userProject.retrieveByUserAndProjectId(
      user_id,
      project_id
    );
    if (!result) {
      return res
        .status(404)
        .json({ message: "User ID or Project ID not found" });
    }
    await userProject.update(user_id, project_id, new Date().toUTCString());
    res.status(200).sendStatus(200);
  } catch (err) {
    res.sendStatus(400).sendStatus(400);
  }
});

module.exports = router;
