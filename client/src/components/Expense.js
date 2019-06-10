import React, { Component } from "react";
import { Input, InputGroup, InputGroupAddon, Button, Form } from "reactstrap";
const uuid = require("uuid");

class Expense extends Component {
  state = {
    expense: null,
    length: this.props.state.expenses.length
  };

  getAllExpenses = value => {
    //Regular Expression. We are only looking for expressions that match <Some amount> <some word like in,for> <Some item>
    var re = /(\d+ \w+ \w+)+/;
    var allExpenses = value.split(",");
    allExpenses = allExpenses.filter(expense => re.test(expense));

    allExpenses.map((expense, index) => {
      allExpenses[index] = expense.trim();
    });
    //console.log(allExpenses);
    return allExpenses;
  };

  handleInputChange = event => {
    const target = event.target;
    if (target.id === "expense-field") {
      this.setState({ expense: target.value });
    }
  };

  parseExpense = expenseFieldValue => {
    var expenseFieldValueSplit = expenseFieldValue.split(" ");
    var item = expenseFieldValueSplit.splice(2).join(" ");
    var amount = expenseFieldValueSplit[0];
    var date = new Date().toLocaleDateString();
    var id = uuid();

    return { id: id, item: item, amount: amount, date: date };
  };
  handleSubmit = event => {
    event.preventDefault();
    var allExpenses = this.getAllExpenses(this.state.expense);
    var allExpensesObjectList = [];
    allExpenses.forEach(expense => {
      allExpensesObjectList.push(this.parseExpense(expense));
    });
    this.props.submitExpense(allExpensesObjectList);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputGroup>
          <Input
            id="expense-field"
            className="expense-input"
            onChange={this.handleInputChange}
            required={true}
          />
          <InputGroupAddon addonType="prepend">
            <Button id="add-expense" color="orange" type="submit">
              Add <span className="font-weight-bold">Expense</span>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    );
  }
}

export default Expense;
