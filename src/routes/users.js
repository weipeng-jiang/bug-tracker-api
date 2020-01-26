const express = require("express");
const user = require("../database/models/users");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await user.retrieveAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).sendStatus;
  }
});

router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const result = await user.retrieveById(user_id);
    if (!result) {
      return res.status(404).sendStatus(404);
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.post("/", async (req, res) => {
  const {
    role_id,
    user_fName,
    user_lName,
    email,
    password,
    last_login
  } = req.body;

  try {
    await user.createNewUser(
      role_id,
      user_fName,
      user_lName,
      email,
      password,
      last_login
    );
    res.status(201).sendStatus(201);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.patch("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const { role_id, user_fName, user_lName, email, password } = req.body;

  try {
    const result = await user.retrieveById(user_id);
    if (!result) {
      return res.status(404).json({ message: "User ID not found" });
    }
    await user.updateUser(
      role_id,
      user_fName,
      user_lName,
      email,
      password,
      user_id
    );
    res.status(200).sendStatus(200);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

router.delete("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const result = await user.retrieveById(user_id);
    if (!result) {
      return res.status(404).json({ message: "User ID is not found" });
    }
    await user.deleteUser(user_id);
    res.status(200).sendStatus(200);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

module.exports = router;
