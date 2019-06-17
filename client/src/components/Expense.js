import React, { Component } from "react";
import {
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Form,
  FormGroup,
  FormFeedback,
  FormText,
  UncontrolledPopover,
  Row,
  Col,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import "../static/scripts";
import { realTimeEditing } from "../static/scripts";
const uuid = require("uuid");

function addingExpenseTooltip() {
  return (
    <FormGroup>
      <Button
        id="info"
        color="outline-primary"
        className="rounded-circle"
        type="button"
      >
        ?
      </Button>
      <UncontrolledPopover placement="bottom" target="info">
        <PopoverHeader>Add Expense</PopoverHeader>
        <PopoverBody>
          Adding expenses is easy. Enter the expense in the following format:{" "}
          <span>
            <i>Amount in/for Item</i>
          </span>
          . If there are multiple expenses, seperate them by commas.
        </PopoverBody>
      </UncontrolledPopover>
    </FormGroup>
  );
}

class Expense extends Component {
  state = {
    expense: null,
    length: this.props.state.expenses.length
  };

  getValidInvalidExpenses = allExpenses => {
    var re = /(\d+ \w+ \w+)+/;
    var validExpenses = [];
    var invalidExpenses = [];
    allExpenses.forEach(expense => {
      if (re.test(expense)) {
        validExpenses.push(expense.trim());
      } else {
        invalidExpenses.push(expense.trim());
      }
    });
    //console.log(invalidExpenses);
    return { valid: validExpenses, invalid: invalidExpenses };
  };
  getAllExpenses = value => {
    //Regular Expression. We are only looking for expressions that match <Some amount> <some word like in,for> <Some item>
    //var re = /(\d+ \w+ \w+)+/;
    var allExpenses = value.split(",");
    var { valid, invalid } = this.getValidInvalidExpenses(allExpenses);
    if (invalid.length > 0) {
      var invalidExpenses = invalid.toString();
      document.querySelector("#expense-field").value = invalidExpenses;
    }
    //console.log(allExpenses);
    return valid;
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
        <Row>
          <Col sm={12}>
            <FormGroup>
              <InputGroup>
                <Input
                  id="expense-field"
                  placeholder="Enter Expense"
                  className="expense-input text-light"
                  onChange={this.handleInputChange}
                  required={true}
                  onKeyUp={realTimeEditing}
                />
                <InputGroupAddon addonType="append">
                  <Button
                    id="add-expense"
                    style={{ borderLeft: "none" }}
                    className="button-glow"
                    color="outline-warning"
                    type="submit"
                  >
                    <span>Add Expense</span>
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              <FormText style={{ fontSize: "8px" }}>
                Enter your expense in the format:{" "}
                <span className="font-italic">Amount in Item</span>
              </FormText>
            </FormGroup>
          </Col>
          {/* <Col sm={1}>{addingExpenseTooltip()}</Col> */}
        </Row>
      </Form>
    );
  }
}

export default Expense;
