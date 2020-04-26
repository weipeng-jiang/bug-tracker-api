const express = require("express");
const humps = require("humps");
const status = require("../database/models/status");
const regex = require("../utils/regex");

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
  const { status_id } = req.params;

  if (!status_id.match(regex)) {
    return res.status(400).sendStatus(400);
  }

  try {
    const result = await status.retrieveById(status_id);
    if (!result) {
      return res.status(404).json({ message: "Status ID is not found" });
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

module.exports = router;
