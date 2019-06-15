const express = require("express");
const User = require("../../models/User");
const router = express.Router();

router.get("/api/home", (req, res) => {
  res.send("Welcome!");
});

router.get("/api/secret", (req, res) => {
  res.send("The password is anal");
});

router.get("/api/users", (req, res) => {
  User.find().then(users => res.json(users));
});

router.post("/api/register", (req, res) => {
  console.log("POST TO /api/register");
  const { email, password } = req.body;
  //console.log(email, password);
  const user = new User({ email, password });
  user.save((err, newUser) => {
    if (err) {
      res.status(500).send("Error registering new user, please try again");
    } else {
      res.status(200).send("Your account has been created. Welcome to brokeAF");
      res.json(newUser);
    }
  });
});

module.exports = router;
