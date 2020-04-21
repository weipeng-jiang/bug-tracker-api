const express = require("express");
const userIssues = require("../database/models/userIssues");
const humps = require("humps");

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
  const user_id = req.params.user_id;

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
  const issue_id = req.params.issue_id;

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

  try {
    const result = await userIssues.retrieveByUserAndIssueId(user_id, issue_id);
    if (result.length == 0) {
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
    await userIssues.assignUserToIssue(user_id, issue_id);
    res.status(201).sendStatus(201);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.delete("/:user_id/:issue_id", async (req, res) => {
  const { user_id, issue_id } = req.params;

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
