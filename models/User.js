const mongoose = require("mongoose");
const expense = require("./expense");
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

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  expense: {
    type: [ExpenseSchema]
  }
});

module.exports = User = mongoose.model("user", UserSchema);
