import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Form,
  FormGroup,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import classnames from "classnames";
import "../static/scripts";
import ExpenseParsingMethods from "../utilities/ExpenseParsingMethods";
import GeneralUtils from "../utilities/GeneralUtils";
import ShakeAnimation from "../utilities/ShakeAnimation";
const uuid = require("uuid");

function greeting(greeting, user) {
  return (
    <h5 className="text-dark text-shadow">
      {greeting},<span className="font-weight-bold"> {user}</span>
    </h5>
  );
}

function errorBadge(component) {
  return (
    <Col sm={6} className="mb-0">
      <div
        id="expense-error"
        style={{ visibility: "hidden" }}
        className="badge bg-danger mt-1 ml-1 shadow-sm"
      >
        <small className="text-light mr-2">
          There are errors in one or more of your expenses!
        </small>
        <Button
          style={{
            outline: "none",
            border: "none",
            boxShadow: "none"
          }}
          type="button"
          size="sm"
          color="none"
          onClick={() => {
            component.displayError(false);
          }}
        >
          &times;
        </Button>
      </div>
    </Col>
  );
}
/**
 * Expense Component. A Card based HTML React component that has a text-field to accept user expenses and inbuilt Regular Expression based methods to parse the entered expenses.
 * @props user
 * @props className
 * @props state
 * @props submitExpense
 */
class Expense extends Component {
  state = {
    expense: null,
    length: this.props.state.expenses.length,
    validExpenses: null,
    activeTab: "1",
    item: "",
    amount: ""
  };
  GU = new GeneralUtils();
  EPM = new ExpenseParsingMethods();
  SA = new ShakeAnimation();

  componentDidMount() {
    if (this.props.focusOnLoad) {
      var inputField = document.getElementById("expense-field");
      inputField.focus();
    }
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
  handleManualInputChange = event => {
    const target = event.target;
    if (target.id === "expense-field-manual-item") {
      this.setState({ item: target.value });
    } else if (target.id === "expense-field-manual-amount") {
      this.setState({ amount: target.value });
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

  displayError = (tof = true) => {
    var errorElement = document.getElementById("expense-error");
    if (errorElement) {
      if (tof) {
        errorElement.style.visibility = "visible";
        this.SA.shake(errorElement, 1, false);
      } else {
        errorElement.style.visibility = "hidden";
      }
    }
  };
  validateManualExpenses = expenseObject => {
    const { item, amount } = expenseObject;
    if (item === "" || amount === "") {
      return false;
    } else if (isNaN(parseFloat(amount))) {
      return false;
    } else {
      return true;
    }
  };
  handleManualSubmit = event => {
    event.preventDefault();
    var expense = { item: this.state.item, amount: this.state.amount };
    if (this.validateManualExpenses(expense)) {
      this.props.submitExpense([expense]);
    } else {
      this.displayError();
    }
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
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        {/* <CardHeader>
            {greeting(this.GU.getGreeting(), this.props.user)}
          </CardHeader> */}
        <Nav className="nav-tabs-custom" tabs>
          <NavItem id="tab-1">
            <NavLink
              className={classnames({
                active: this.state.activeTab === "1"
              })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Default Entry
            </NavLink>
          </NavItem>
          <NavItem id="tab-2">
            <NavLink
              className={classnames({
                active: this.state.activeTab === "2"
              })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Manual Entry
            </NavLink>
          </NavItem>
        </Nav>

        <Card className={"card-border-custom " + this.props.className}>
          {errorBadge(this)}
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <CardBody>
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
                          onFocus={this.displayError(false)}
                        />

                        <Button
                          id="add-expense"
                          color="custom btn-block"
                          type="submit"
                        >
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
              </CardBody>
            </TabPane>
            <TabPane tabId="2">
              <CardBody>
                <Form className="" onSubmit={this.handleManualSubmit}>
                  <Row>
                    <Col sm={12}>
                      <FormGroup>
                        <Input
                          id="expense-field-manual-item"
                          placeholder="Enter Item"
                          className="expense-input mb-3 input-custom"
                          onChange={this.handleManualInputChange}
                          required={true}
                          onFocus={this.displayError(false)}
                        />
                        <Input
                          id="expense-field-manual-amount"
                          placeholder="Enter Amount"
                          className="expense-input mb-3 input-custom"
                          onChange={this.handleManualInputChange}
                          required={true}
                          onFocus={this.displayError(false)}
                        />

                        <Button
                          id="add-expense-manual"
                          color="custom btn-block"
                          type="submit"
                        >
                          <span>Add</span>
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </TabPane>
          </TabContent>
        </Card>
      </div>
    );
  }
}

export default Expense;
