import React, { Component } from "react";
import {
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Form,
  FormGroup,
  UncontrolledPopover,
  UncontrolledTooltip,
  Row,
  Col,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import "../static/scripts";
import { realTimeEditing } from "../static/scripts";
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
        <Row>
          <Col sm={11}>
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
                    Add <span className="font-weight-bold">Expense</span>
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col sm={1}>
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
                  Adding expenses is easy. Enter the expense in the following
                  format:{" "}
                  <span>
                    <i>Amount in/for Item</i>
                  </span>
                  . If there are multiple expenses, seperate them by commas.
                </PopoverBody>
              </UncontrolledPopover>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Expense;
