const express = require("express");
const issue = require("../database/models/issues");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await issue.retrieveAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/:issue_id", async (req, res) => {
  const issue_id = req.params.issue_id;
  try {
    const result = await issue.retrieveById(issue_id);
    if (!result) {
      return res.status(404).json({ message: "Issue ID is not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

// TODO: GET endpoint retrieveIssuesByProject_Id

router.post("/", async (req, res) => {
  const {
    project_id,
    priority_id,
    user_id,
    status_id,
    title,
    description,
    report_date
  } = req.body;

  try {
    await issue.createNewIssue(
      project_id,
      priority_id,
      user_id,
      status_id,
      title,
      description,
      report_date
    );
    res.status(201).sendStatus(201);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

// TODO: bug, fix patch endpoint to update selected fields
router.patch("/:issue_id", async (req, res) => {
  const issue_id = req.params.issue_id;
  const { priority_id, status_id, title, description } = req.body;

  try {
    const result = await issue.retrieveById(issue_id);
    if (!result) {
      return res.status(404).json({ message: "Issue ID not found" });
    }
    await issue.updateIssue(
      priority_id,
      status_id,
      title,
      description,
      issue_id
    );
    res.status(200).sendStatus(200);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.delete("/:issue_id", async (req, res) => {
  const issue_id = req.params.issue_id;

  try {
    const result = await issue.retrieveById(issue_id);
    if (!result) {
      return res.status(404).json({ message: "Issue ID is not found" });
    }
    await issue.deleteIssue(issue_id);
    res.status(200).sendStatus(200);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

module.exports = router;
