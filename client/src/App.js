import React, { Component } from "react";

import {
  Spinner,
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Badge,
  Button
} from "reactstrap";
import AppNavbar from "./components/AppNavbar";
import Expense from "./components/Expense";
import ExpenseTable from "./components/ExpenseTable";
import "./static/App.css";
import "./static/scripts";
import "./static/brandon.png";
import { snackBar, getGreeting } from "./static/scripts";
import AuthHelperMethods from "./utilities/AuthHelperMethods";
import withAuth from "./components/withAuth";
const axios = require("axios");

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
    user: "",
    expenses: [],
    loading: false
  };
  Auth = new AuthHelperMethods();
  _handleLogout = () => {
    this.Auth.logout();
    this.props.history.replace("/login");
  };

  componentDidMount() {
    //Called to as soon as Component is rendered
    this.setState({ loading: true });
    axios
      .get("/api/auth/user", {
        headers: {
          "x-auth-token": this.Auth.getToken()
        }
      })
      .then(res => {
        const expenses = res.data.expense;
        expenses.map((expense, index) => {
          expenses[index] = {
            _id: expense._id,
            item: expense.item,
            amount: expense.amount,
            date: expense.date
            //date: new Date(expense.date).toLocaleString().split(",")[0]
          };
        });
        this.setState({ user: res.data.name });
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
    const config = {
      headers: {
        "x-auth-token": this.Auth.getToken()
      }
    };
    expenseObject.forEach(expense => {
      this.setState({ loading: true });
      //console.log(expense);

      //need to post the token with the expense object.
      axios
        .post("/api/auth/user", expense, config)
        .then(res => {
          //console.log(res);
          snackBar();
        })
        .catch(err => {
          console.log("Error adding item\n" + err);
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
    const config = {
      params: {
        _id: removeId
      },
      headers: {
        "x-auth-token": this.Auth.getToken()
      }
    };
    axios
      .delete(`/api/auth/user/${removeId}`, config)
      .then(res => {
        //console.log(res);
        this.setState(state => ({
          expenses: state.expenses.filter(expense => expense._id !== removeId)
        }));
      })
      .catch(err => {
        console.log("Cannot delete item!\n" + err);
      });
  };

  testPost = () => {
    const test = { msg: "hello fuckers" };
    axios
      .post("/api/auth/user", test, {
        headers: {
          "x-auth-token": this.Auth.getToken()
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  };

  render() {
    return (
      <div className="App">
        <AppNavbar handleLogout={this._handleLogout} />

        <div className="container-fluid">
          {/* <Row>
            <h3 id="greeting" className="text-light mt-4 mx-auto">
              {getGreeting()},
              <span className="font-weight-bold"> {this.state.user}</span>
            </h3>
          </Row> */}

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
                <Row className="expense-table-card-header">
                  <Col xs="6">
                    <div className="expense-table-heading">Expenses</div>
                  </Col>
                  <Col xs="6">
                    <Badge
                      color={this.totalExpenseBadgeColor(this.state.expenses)}
                      className="p-2 float-right"
                      pill
                    >
                      This Month's Expenses:
                      <span>
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
                    expenses={this.state.expenses}
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
          <div className="small p-3" id="snackbar">
            Added Expense
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(App);
