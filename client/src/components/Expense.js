import React, { Component } from "react";
import {
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Form,
  FormGroup,
  FormText,
  UncontrolledPopover,
  Card,
  CardColumns,
  CardDeck,
  Row,
  Col,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import "../static/scripts";
import ExpenseParsingMethods from "../utilities/ExpenseParsingMethods";
import { realTimeEditing } from "../static/scripts";
const uuid = require("uuid");

class Expense extends Component {
  state = {
    expense: null,
    length: this.props.state.expenses.length,
    validExpenses: null
  };

  EPM = new ExpenseParsingMethods();

  addToValidExpenses = event => {
    var whichKey = event.keyCode || event.which;
    if (whichKey == 188 || whichKey == 8) {
      var validExpenses = this.getAllExpenses(this.state.expense.toString());
      if (this.state.validExpenses !== validExpenses) {
        this.setState({ validExpenses });
      }
    }
  };
  getAllExpenses = value => {
    var valid = this.EPM.parseExpense(value);
    return valid;
  };

  handleInputChange = event => {
    const target = event.target;
    if (target.id === "expense-field") {
      this.setState({ expense: target.value });
    }
  };

  parseExpense = expenseFieldValue => {
    var { item, amount } = this.EPM.extractExpenseInformation(
      expenseFieldValue
    );
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
      <React.Fragment>
        {/* {this.state.validExpenses !== null ? (
          <Row className="mb-1">
            <Col sm={12}>
              {this.state.validExpenses.map((eachValidExpense, index) => (
                <Button
                  style={{ fontSize: "10px" }}
                  className="p-1 mr-1"
                  color="success"
                  size="sm"
                >
                  {eachValidExpense}
                </Button>
              ))}
            </Col>
          </Row>
        ) : (
          <React.Fragment />
        )} */}
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
                    onKeyUp={this.addToValidExpenses}
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
      </React.Fragment>
    );
  }
}

export default Expense;
