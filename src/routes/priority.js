const express = require("express");
const humps = require("humps");
const priority = require("../database/models/priority");
const regex = require("../utils/regex");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await priority.retrieveAll();
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/:priority_id", async (req, res) => {
  const { priority_id } = req.params;

  if (!priority_id.match(regex)) {
    return res.status(400).sendStatus(400);
  }

  try {
    const result = await priority.retrieveById(priority_id);
    if (!result) {
      return res.status(404).sendStatus(404);
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

module.exports = router;
