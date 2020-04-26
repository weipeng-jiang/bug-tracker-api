const express = require("express");
const humps = require("humps");
const comments = require("../database/models/comments");
const regex = require("../utils/regex");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await comments.retrieveAll();
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/:comment_id", async (req, res) => {
  const { comment_id } = req.params;

  if (!comment_id.match(regex)) {
    return res.status(400).sendStatus(400);
  }

  try {
    const result = await comments.retrieveByCommentId(comment_id);
    if (!result) {
      return res.status(404).json({ message: "Comment ID is not found" });
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
    const result = await comments.retrieveCommentsByIssueId(issue_id);
    if (result.length == 0) {
      return res.status(404).json({ message: "Issue ID is not found" });
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.post("/", async (req, res) => {
  const { issue_id, user_id, description } = req.body;

  try {
    await comments.createNewComment(
      issue_id,
      user_id,
      description,
      new Date().toUTCString()
    );
    res.status(201).sendStatus(201);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.patch("/:comment_id", async (req, res) => {
  const { description } = req.body;
  const comment_id = req.params.comment_id;

  if (!comment_id.match(regex)) {
    return res.status(400).sendStatus(400);
  }

  try {
    const foundId = await comments.retrieveByCommentId(comment_id);
    if (!foundId) {
      return res.status(404).json({ message: "Comment ID is not found" });
    }
    await comments.updateComment(
      description,
      new Date().toUTCString(),
      comment_id
    );
    res
      .status(200)
      .json(humps.camelizeKeys(await comments.retrieveByCommentId(comment_id)));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.delete("/:comment_id", async (req, res) => {
  const comment_id = req.params.comment_id;

  if (!comment_id.match(regex)) {
    return res.status(400).sendStatus(400);
  }

  try {
    const result = await comments.retrieveByCommentId(comment_id);
    if (!result) {
      return res.status(404).json({ message: "Comment ID is not found" });
    }
    await comments.deleteComment(comment_id);
    res.status(200).sendStatus(200);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

module.exports = router;
