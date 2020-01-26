const express = require("express");
const priority = require("../database/models/priority");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await priority.retrieveAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/:priority_id", async (req, res) => {
  const priority_id = req.params.priority_id;
  try {
    const result = await priority.retrieveById(priority_id);
    if (!result) {
      return res.status(404).sendStatus(404);
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

module.exports = router;
