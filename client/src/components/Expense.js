import React, { Component } from "react";
import {
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Form,
  FormGroup,
  FormText,
  Row,
  Col
} from "reactstrap";
import "../static/scripts";
import ExpenseParsingMethods from "../utilities/ExpenseParsingMethods";
const uuid = require("uuid");

class Expense extends Component {
  state = {
    expense: null,
    length: this.props.state.expenses.length,
    validExpenses: null
  };

  EPM = new ExpenseParsingMethods();

  componentDidMount() {
    var inputField = document.getElementById("expense-field");
    inputField.focus();
  }

  addToValidExpenses = event => {
    var whichKey = event.keyCode || event.which;
    if (whichKey == 188 || whichKey == 8) {
      var validExpenses = this.getAllExpenses(this.state.expense.toString());
      if (this.state.validExpenses !== validExpenses) {
        this.setState({ validExpenses });
      }
    }
  };
  /**
   * Returns all valid expenses, if any. Else returns false
   * @param {string} value
   */
  getAllExpenses = value => {
    var valid = this.EPM.parseExpense(value);
    if (valid) {
      return valid;
    } else {
      return false;
    }
  };

  handleInputChange = event => {
    const target = event.target;
    if (target.id === "expense-field") {
      this.setState({ expense: target.value });
    }
  };
  /**
   * Parses the expense to extract item name and amount.
   * @param {string} expenseFieldValue
   * @returns {Object}
   */
  parseExpense = expenseFieldValue => {
    var { item, amount } = this.EPM.extractExpenseInformation(
      expenseFieldValue
    );

    return { item: item, amount: amount };
  };
  /**
   * Takes event object of the called input element, extracts the valid expenses from the value field of the input
   * element and submits to the props of the parent component
   * @param {object} event
   */
  handleSubmit = event => {
    event.preventDefault();

    var allExpenses = this.getAllExpenses(this.state.expense);

    var allExpensesObjectList = [];
    if (allExpenses) {
      allExpenses.forEach(expense => {
        allExpensesObjectList.push(this.parseExpense(expense));
      });

      this.props.submitExpense(allExpensesObjectList);
    } else {
      document.getElementById("expense-error").style.visibility = "visible";
    }
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={4}>
            <div
              id="expense-error"
              style={{ visibility: "hidden" }}
              className="badge bg-danger pill"
            >
              <small className="text-light">
                There are errors in one or more of your expenses!
              </small>
            </div>
          </Col>
        </Row>
        <Form className="" onSubmit={this.handleSubmit}>
          <Row>
            <Col sm={12}>
              <FormGroup>
                <Input
                  id="expense-field"
                  placeholder="Enter Expense"
                  className="expense-input mb-3 input-custom"
                  onChange={this.handleInputChange}
                  required={true}
                  onKeyUp={this.addToValidExpenses}
                />

                <Button id="add-expense" color="custom btn-block" type="submit">
                  <span>Add</span>
                </Button>

                {/* <FormText style={{ fontSize: "8px" }}>
                  Enter your expense in the format:{" "}
                  <span className="font-italic">Amount in Item</span>
                </FormText> */}
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
