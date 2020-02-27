const express = require("express");
const users = require("../database/models/users");
const humps = require("humps");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await users.retrieveAll();
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus;
  }
});

router.get("/user_id/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const result = await users.retrieveById(user_id);
    if (!result) {
      return res.status(404).sendStatus(404);
    }
    res.status(200).json(humps.camelizeKeys(result));
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

// TODO: bug, last_login not needed
router.post("/", async (req, res) => {
  const { role_id, user_fName, user_lName, email, last_login } = req.body;

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    await users.createNewUser(
      role_id,
      user_fName,
      user_lName,
      email,
      hashedPassword,
      last_login
    );
    res.status(201).sendStatus(201);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

// TODO: still need work
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const userLogin = await users.retrieveEmailAndPassword(email);

  if (!userLogin) {
    return res.status(404).sendStatus(404);
  }
  try {
    if (await bcrypt.compare(password, userLogin.password)) {
      res.status(200).json(userLogin);
    } else {
      res.status(400).send("not allowed");
    }
  } catch {
    res.status(500).sendStatus(500);
  }
});

// TODD: make sure user is logged in
router.patch("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const { role_id, user_fName, user_lName, email, password } = req.body;

  try {
    const result = await users.retrieveById(user_id);
    if (!result) {
      return res.status(404).json({ message: "User ID not found" });
    }
    await users.updateUser(
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
    const result = await users.retrieveById(user_id);
    if (!result) {
      return res.status(404).json({ message: "User ID is not found" });
    }
    await users.deleteUser(user_id);
    res.status(200).sendStatus(200);
  } catch (err) {
    res.status(400).sendStatus(400);
  }
});

module.exports = router;
