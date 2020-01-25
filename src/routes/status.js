const express = require("express");
const status = require("../database/models/status");

const router = express.Router();

// router.get("/", (req, res) => {
//   status.retrieveAll((err, status) => {
//     if (err) return res.json(err);
//     return res.json(status);
//   });
// });

// router.get("/status_id=:status_id", (req, res) => {
//   const status_id = req.params.status_id;

//   status.retrieveByStatus_Id(status_id, (err, result) => {
//     if (err) return res.json(err);
//     return res.json(result);
//   });
// });

router.get("/", async (req, res, next) => {
  try {
    const results = await status.retrieveAll();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).sendStatus(500);
  }
});

module.exports = router;
