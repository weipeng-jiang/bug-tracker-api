const express = require("express");
const comments = require("../database/models/comments");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await comments.retrieveAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/:comment_id", async (req, res) => {
  const comment_id = req.params.comment_id;
  try {
    const result = await comments.retrieveByCommentId(comment_id);
    if (!result) {
      return res.status(404).json({ message: "Comment ID is not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/issue/:issue_id", async (req, res) => {
  const { issue_id } = req.params;

  try {
    const result = await comments.retrieveCommentsByIssueId(issue_id);
    res.status(200).json(result);
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

  try {
    const foundId = await comments.retrieveByCommentId(comment_id);
    if (!foundId) {
      return res.status(404).json({ message: "Comment ID not found" });
    }
    await comments.updateComment(
      description,
      new Date().toUTCString(),
      comment_id
    );
    res.status(200).json(await comments.retrieveByCommentId(comment_id));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.delete("/:comment_id", async (req, res) => {
  const comment_id = req.params.comment_id;

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
