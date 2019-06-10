const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  item: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

let Expense = (module.exports = mongoose.model("Expense", ExpenseSchema));
