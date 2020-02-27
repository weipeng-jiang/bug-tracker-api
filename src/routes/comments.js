const express = require("express");
const comment = require("../database/models/comments");
const humps = require("humps");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await comment.retrieveAll();
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/:comment_id", async (req, res) => {
  const comment_id = req.params.comment_id;
  try {
    const result = await comment.retrieveById(comment_id);
    if (!result) {
      return res.status(404).json({ message: "Comment ID is not found" });
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.post("/", async (req, res) => {
  const { issue_id, user_id, description, comment_date } = req.body;

  try {
    await comment.createNewComment(
      issue_id,
      user_id,
      description,
      comment_date
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
    const result = await comment.retrieveById(comment_id);
    if (!result) {
      return res.status(404).json({ message: "Comment ID not found" });
    }
    await comment.updateComment(
      description,
      new Date().toUTCString(),
      comment_id
    );
    res.status(200).sendStatus(200);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.delete("/:comment_id", async (req, res) => {
  const comment_id = req.params.comment_id;

  try {
    const result = await comment.retrieveById(comment_id);
    if (!result) {
      return res.status(404).json({ message: "Comment ID is not found" });
    }
    await comment.deleteComment(comment_id);
    res.status(200).sendStatus(200);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

module.exports = router;
