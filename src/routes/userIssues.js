const express = require("express");
const humps = require("humps");
const userIssues = require("../database/models/userIssues");
const regex = require("../utils/regex");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await userIssues.retrieveAll();
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/user/:user_id", async (req, res) => {
  const { user_id } = req.params;

  if (!user_id.match(regex)) {
    return res.status(400).sendStatus(400);
  }

  try {
    const result = await userIssues.retrieveByUserId(user_id);
    if (result.length == 0) {
      return res.status(404).json({ message: "User ID is not found" });
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/issue/:issue_id", async (req, res) => {
  const { issue_id } = req.params;

  if (!issue_id.match(regex)) {
    return res.status(400).sendStatus(400);
  }

  try {
    const result = await userIssues.retrieveByIssueId(issue_id);
    if (result.length == 0) {
      return res.status(404).json({ message: "Issue ID is not found" });
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/:user_id/:issue_id", async (req, res) => {
  const { user_id, issue_id } = req.params;

  if (!user_id.match(regex) || !issue_id.match(regex)) {
    return res.status(400).sendStatus(400);
  }

  try {
    const result = await userIssues.retrieveByUserAndIssueId(user_id, issue_id);
    if (result.length == 0) {
      return res
        .status(404)
        .json({ message: "User ID or Issue ID is not found" });
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.post("/", async (req, res) => {
  const { user_id, issue_id } = req.body;

  try {
    await userIssues.assignUserToIssue(user_id, issue_id);
    res.status(201).sendStatus(201);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.delete("/:user_id/:issue_id", async (req, res) => {
  const { user_id, issue_id } = req.params;

  if (!user_id.match(regex) || !issue_id.match(regex)) {
    return res.status(400).sendStatus(400);
  }

  try {
    const result = await userIssues.retrieveByUserAndIssueId(user_id, issue_id);
    if (!result) {
      return res.status(404).json({ message: "User or issue is not found" });
    }
    await userIssues.removeUserFromIssue(user_id, issue_id);
    res.status(200).sendStatus(200);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

module.exports = router;
