const express = require("express");
const status = require("../database/models/status");
const humps = require("humps");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await status.retrieveAll();
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(500).sendStatus(500);
  }
});

router.get("/:status_id", async (req, res) => {
  const status_id = req.params.status_id;
  try {
    const result = await status.retrieveById(status_id);
    if (!result) {
      return res.status(404).sendStatus(404);
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

module.exports = router;
