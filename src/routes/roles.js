const express = require("express");
const roles = require("../database/models/roles");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await roles.retrieveAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.get("/:role_id", async (req, res) => {
  const role_id = req.params.role_id;
  try {
    const result = await roles.retrieveById(role_id);
    if (!result) {
      return res.status(404).sendStatus(404);
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.post("/", async (req, res) => {
  const { role_id, role_title } = req.body;

  try {
    await roles.createNewRole(role_id, role_title);
    res.status(201).sendStatus(201);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.patch("/:role_id", async (req, res) => {
  const role_id = req.params.role_id;
  const role_title = req.body.role_title;

  try {
    const result = await roles.updateRole(role_title, role_id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.delete("/:role_id", async (req, res) => {
  const role_id = req.params.role_id;
  try {
    const result = await roles.retrieveById(role_id);
    if (!result) {
      return res.status(404).json({ message: "Role ID not found" });
    }
    await roles.deleteRole(role_id);
    res.status(200).sendStatus(200);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

// TODO: apply middle ware
async function roleId(req, res, next) {
  let role;
  try {
    role = await roles.findById(req.params.role_id);
    if (role == null) {
      return res.status(404).sendStatus(404);
    }
  } catch (err) {
    res.status(500).sendStatus(500);
  }

  res.role = role;
  next();
}

module.exports = router;
