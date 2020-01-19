const express = require("express");
const Status = require("../models/Status");

const router = express.Router();

router.get("/", (req, res) => {
  Status.retrieveAll((err, status) => {
    if (err) return res.json(err);
    return res.json(status);
  });
});

router.get("/status_id=:status_id", (req, res) => {
  const status_id = req.params.status_id;

  Status.retrieveByStatus_Id(status_id, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
