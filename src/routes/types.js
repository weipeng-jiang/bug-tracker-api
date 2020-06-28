const express = require("express");
const humps = require("humps");

const types = require("../database/models/types");
const regex = require("../utils/regex");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await types.retrieveAll();
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/:type_id", async (req, res) => {
  const { type_id } = req.params;

  if (!type_id.match(regex)) {
    return res.status(400).sendStatus(400);
  }

  try {
    const result = await types.retrieveByTypeId(type_id);
    if (!result) {
      return res.status(404).json({ message: "Type ID not found." });
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

module.exports = router;
