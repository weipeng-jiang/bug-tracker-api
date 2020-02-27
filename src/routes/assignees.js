const express = require("express");
const assignee = require("../database/models/assignees");
const humps = require("humps");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await assignee.retrieveAll();
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/user/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const result = await assignee.retrieveByUserId(user_id);
    if (!result) {
      return res.status(404).json({ message: "User ID not found" });
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/issue/:issue_id", async (req, res) => {
  const issue_id = req.params.issue_id;

  try {
    const result = await assignee.retrieveByIssueId(issue_id);
    if (!result) {
      return res.status(404).json({ message: "Issue ID not found" });
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/:user_id/:issue_id", async (req, res) => {
  const { user_id, issue_id } = req.params;

  try {
    const result = await assignee.retrieveByUserAndIssueId(user_id, issue_id);
    if (!result) {
      return res.status(404).json({ message: "User ID or Issue ID not found" });
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.post("/", async (req, res) => {
  const { user_id, issue_id } = req.body;

  try {
    await assignee.insert(user_id, issue_id);
    res.status(201).sendStatus(201);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

module.exports = router;
