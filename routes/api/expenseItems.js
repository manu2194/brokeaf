const express = require("express");

const router = express.Router();

const Expense = require("../../models/expense");

//GET request
router.get("/", (req, res) => {
  console.log(`GET - ${req.originalUrl}`);
  Expense.find()
    .sort({ date: -1 })
    .then(expenses => res.json(expenses));
});

//POST request
router.post("/", (req, res) => {
  let newExpense = new Expense();
  newExpense.item = req.body.item;
  newExpense.amount = req.body.amount;
  console.log(`POST - ${req.originalUrl}`);
  newExpense.save((err, expense) => {
    if (err) {
      console.log("MANU ERROR", err);
    } else {
      res.json(expense);
    }
  });
});

router.delete("/:id", (req, res) => {
  console.log(`DELETE - ${req.originalUrl}`);
  Expense.findById(req.params.id)
    .then(expense => expense.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});
module.exports = router;
