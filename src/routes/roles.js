const express = require("express");
const roles = require("../database/models/roles");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await roles.retrieveAll();
    res.status(200).json(results);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/:role_id", async (req, res, next) => {
  const role_id = req.params.role_id;
  try {
    const results = await roles.retrieveById(role_id);

    if (!results) {
      return res.status(404).sendStatus(404);
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.post("/", async (req, res, next) => {
  const role_id = req.body.role_id;
  const role_title = reg.body.role_title;

  try {
    const results = await roles.createNewRole(role_id, role_title);
    res
      .send(results)
      .status(201)
      .json(results);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

// router.post("/", (req, res) => {
//   const role_id = req.body.role_id;
//   const role_title = req.body.role_title;

//   Roles.insert(role_id, role_title, (err, result) => {
//     if (err) return res.json(err);
//     return res.json(result);
//   });
// });

module.exports = router;
