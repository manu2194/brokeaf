import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import {
  Spinner,
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Badge
} from "reactstrap";
import AppNavbar from "./components/AppNavbar";
import Expense from "./components/Expense";
import ExpenseTable from "./components/ExpenseTable";
import "./static/App.css";
import "./static/scripts";
import "./static/brandon.png";
import { snackBar } from "./static/scripts";

var axios = require("axios");

/**
 * Spinner icon component that is set to be visible if the parameter loadingFlag is set to be true.
 * @param {boolean} loadingFlag
 */
function SpinnerIcon(loadingFlag) {
  return (
    <Spinner
      style={{ visibility: loadingFlag ? "visible" : "hidden", zIndex: 1 }}
      className="mx-auto mt-3"
      id="spinner-icon"
      color="warning"
    />
  );
}
class App extends Component {
  state = {
    expenses: [],
    loading: false
  };

  componentDidMount() {
    //Called to as soon as Component is rendered
    this.setState({ loading: true });
    axios.get("/api/expenses").then(res => {
      const expenses = res.data;
      //Converting MongoDB date format to pretty JavaScript date format
      expenses.map((expense, index) => {
        expenses[index] = {
          _id: expense._id,
          item: expense.item,
          amount: expense.amount,
          date: expense.date
          //date: new Date(expense.date).toLocaleString().split(",")[0]
        };
      });
      this.setState({ loading: false });
      this.setState({ expenses });
    });
  }

  calculateThisMonthExpenses = expenseArray => {
    var currentMonth = new Date(Date.now()).getMonth();
    var thisMonthExpenes = expenseArray.filter(
      expense => new Date(expense.date).getMonth() == currentMonth
    );
    var sum = 0;
    thisMonthExpenes.map(element => {
      sum = sum + parseFloat(element.amount);
    });
    return sum;
  };

  totalExpenseBadgeColor = expenseArray => {
    if (expenseArray.length === 0) {
      return "danger";
    } else {
      return "warning";
    }
  };

  handleSubmitExpense = expenseObject => {
    //POST to Backend Epi, each expense Object
    expenseObject.forEach(expense => {
      this.setState({ loading: true });
      //console.log(expense);
      axios
        .post("/api/expenses", expense)
        .then(res => {
          snackBar();
        })
        .finally(() => {
          this.componentDidMount();
        });
    });
  };
  /**
   * Handler that sends a HTTP DELETE request to the server to remove the expense with the given ID from the database
   * @param {string} removeId
   */
  removeExpenseHandler = removeId => {
    this.setState(state => ({
      expenses: state.expenses.filter(expense => expense._id !== removeId)
    }));
    axios
      .delete(`/api/expenses/${removeId}`, { params: { _id: removeId } })
      .then(res => {
        //console.log(res);
      });
  };

  render() {
    return (
      <div className="App">
        <AppNavbar />
        <div className="container-fluid">
          <Row>
            <div className="mt-5 mb-5 mx-auto" style={{ width: "90%" }}>
              <Expense
                state={this.state}
                submitExpense={this.handleSubmitExpense}
              />
            </div>
          </Row>

          <Row>
            <Card
              style={{ width: "90%" }}
              color="dark"
              className="mx-auto mb-5 text-light rounded border border-warning"
            >
              <CardHeader>
                <Row>
                  <Col xs="3">Expenses</Col>
                  <Col xs="9">
                    <Badge
                      color={this.totalExpenseBadgeColor(this.state.expenses)}
                      className="p-2 float-right"
                      pill
                    >
                      This Month's Expenses:
                      <span className="ml-2">
                        ${" "}
                        {this.calculateThisMonthExpenses(
                          this.state.expenses
                        ).toFixed(2)}
                      </span>
                    </Badge>
                  </Col>
                </Row>
              </CardHeader>
              {SpinnerIcon(this.state.loading)}
              <CardBody className="pl-0 pr-0">
                {this.state.expenses.length > 0 ? (
                  <ExpenseTable
                    color="dark"
                    state={this.state}
                    removeExpense={this.removeExpenseHandler}
                  />
                ) : (
                  <div className="row">
                    <span className="mx-auto"> You have no expenses</span>
                  </div>
                )}
              </CardBody>
            </Card>
          </Row>
          <div className="pt-2 pb-2 pr-2 pl-2" id="snackbar">
            Added Expense
          </div>
        </div>
      </div>
    );
  }
}

export default App;
