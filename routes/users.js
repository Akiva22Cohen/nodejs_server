const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  validateUser,
  validateLogin,
  createToken,
} = require("../models/userModel");
const router = express.Router();
const fs = require("node:fs");

const path = require("path");
const usersPath = path.join(__dirname, "../json/users.json");

router.get("/", (req, res) => {
  res.json({ msg: "user work" });
});

router.get("/myInfo", auth, (req, res) => {
  fs.readFile(usersPath, "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);

    const users = data ? JSON.parse(data) : [];
    const user = users.find((item) => item.id == req.tokenData._id);
    res.json(user);
  });
});

// הוספת משתמש
router.post("/", (req, res) => {
  const validBody = validateUser(req.body);
  if (validBody.error) return res.status(400).json(validBody.error.details);

  fs.readFile(usersPath, "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);

    const users = data ? JSON.parse(data) : [];
    const user = { id: Date.now(), ...req.body };
    users.push(user);

    fs.writeFile(usersPath, JSON.stringify(users), (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
      res.status(201).json(users[users.length - 1]);
    });
  });
});

router.post("/login", (req, res) => {
  const validBody = validateLogin(req.body);
  if (validBody.error) return res.status(400).json(validBody.error.details);

  fs.readFile(usersPath, "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);

    const users = data ? JSON.parse(data) : [];

    // נבדוק אם המייל של המשתמש בכלל קיים במערכת
    const user = users.find((item) => item.email == req.body.email);
    if (!user) return res.status(401).json({ err: "Email not found!" });

    // נבדוק אם הסיסמא שמהבאדי תואמת לסיסמא ברשומה שמצאנו עם המייל
    const validPass = req.body.password == user.password;
    if (!validPass) return res.status(401).json({ err: "Password not match" });

    // נשלח טוקן
    const token = createToken(user.id);
    // res.json({ token });
    res
      .cookie("token", token, {
        httpOnly: false,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .json({ token, msg: "You logged in" });
  });
});

module.exports = router;
