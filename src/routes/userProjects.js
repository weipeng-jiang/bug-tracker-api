const express = require("express");
const humps = require("humps");
const userProjects = require("../database/models/userProjects");
const regex = require("../utils/regex");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await userProjects.retrieveAll();
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/user/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  if (!user_id.match(regex)) {
    return res.status(400).sendStatus(400);
  }

  try {
    const result = await userProjects.retrieveByUserId(user_id);
    if (result.length == 0) {
      return res.status(404).json({ message: "User ID is not found" });
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/project/:project_id", async (req, res) => {
  const { project_id } = req.params;

  if (!project_id.match(regex)) {
    return res.status(400).sendStatus(400);
  }

  try {
    const result = await userProjects.retrieveByProjectId(project_id);
    if (result.length == 0) {
      return res.status(404).json({ message: "Project ID is not found" });
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/:user_id/:project_id", async (req, res) => {
  const { user_id, project_id } = req.params;

  if (!user_id.match(regex) || !project_id.match(regex)) {
    return res.status(400).sendStatus(400);
  }

  try {
    const result = await userProjects.retrieveByUserAndProjectId(
      user_id,
      project_id
    );
    if (result.length == 0) {
      return res
        .status(404)
        .json({ message: "User ID or Project ID not found" });
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.post("/", async (req, res) => {
  const { user_id, project_id } = req.body;

  try {
    await userProjects.assignUserToProject(
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

  if (!user_id.match(regex) || !project_id.match(regex)) {
    return res.status(400).sendStatus(400);
  }

  try {
    const result = await userProjects.retrieveByUserAndProjectId(
      user_id,
      project_id
    );
    if (result.length == 0) {
      return res
        .status(404)
        .json({ message: "User ID or Project ID not found" });
    }
    await userProjects.updateUserExitProjectDate(
      user_id,
      project_id,
      new Date().toUTCString()
    );
    return res
      .status(200)
      .json(
        humps.camelizeKeys(
          await userProjects.retrieveByUserAndProjectId(user_id, project_id)
        )
      );
  } catch (err) {
    res.sendStatus(400).sendStatus(400);
  }
});

module.exports = router;
