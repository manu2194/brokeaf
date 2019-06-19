const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Expense = require("../../models/expense");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

/**
 *@route POST api/auth
 *@desc Auth User
 *@access Public
 */
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //Simple validation
  if (!email || !password) {
    //Bad request
    return res.status(400).json({ msg: "Please Enter All Fields" });
  }

  //Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: `User does not exist` });

    //Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

/**
 * @route GET api/auth/user
 * @desc Get user data
 * @access Private
 */

router.get("/user", auth, (req, res) => {
  console.log("GET - ", req.originalUrl);
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      res.json(user);
    });
});

/**
 * @route POST api/auth/user/
 * @desc POST expenses of particular user
 * @access Private
 */
router.post("/user", auth, (req, res) => {
  console.log("POST - ", req.originalUrl);
  const userid = req.user.id;
  const { item, amount } = req.body;
  let newExpense = new Expense();
  newExpense.item = item;
  newExpense.amount = amount;
  User.update({ _id: userid }, { $push: { expense: newExpense } })
    .then(() => {
      res.json({ msg: "success" });
    })
    .catch(err => {
      console.log(err);
    });
});

/**
 * @route DELETE api/auth/user/:id
 * @desc Deletes expenses of particular user
 * @access Private
 */
router.delete("/user/:id", auth, (req, res) => {
  console.log("DELETE - ", req.originalUrl);
  const userid = req.user.id;
  User.findByIdAndUpdate(
    userid,
    { $pull: { expense: { _id: req.params.id } } },
    { safe: true, upsert: false },
    (err, user) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({ msg: "success", user: user });
    }
  );
});

module.exports = router;
