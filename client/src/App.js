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
import "./static/styles/App.css";
import "./static/scripts";
import "./static/brandon.png";
import { snackBar, getGreeting } from "./static/scripts";
import AuthHelperMethods from "./utilities/AuthHelperMethods";
import GeneralUtils from "./utilities/GeneralUtils";
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
  GU = new GeneralUtils();
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
      return "warning";
    } else {
      return "dark";
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
          document.getElementById("expense-field").value = "";
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
      <React.Fragment>
        <div className="App">
          <div className="login-bg" />
          <AppNavbar handleLogout={this._handleLogout} />

          <div className="container-fluid">
            <Row className="mt-4">
              <Col sm={5} className="mb-4">
                <Card className="shadow-sm card-custom">
                  <CardHeader>
                    <h5 className="text-dark text-shadow">
                      {this.GU.getGreeting()},
                      <span className="font-weight-bold">
                        {" "}
                        {this.state.user}
                      </span>
                    </h5>
                  </CardHeader>
                  <CardBody>
                    <Expense
                      state={this.state}
                      submitExpense={this.handleSubmitExpense}
                    />
                  </CardBody>
                </Card>
              </Col>

              <Col sm={7} className="mb-4">
                <Card className="shadow-sm card-custom">
                  <CardHeader className="shadow">
                    <Badge
                      color={this.totalExpenseBadgeColor(this.state.expenses)}
                      className="p-2 shadow-sm"
                      pill
                    >
                      {this.GU.monthString(new Date().getMonth())}'s Expenses:{" "}
                      <span>
                        $
                        {this.GU.prettyNumber(
                          this.calculateThisMonthExpenses(this.state.expenses)
                        )}
                      </span>
                    </Badge>
                  </CardHeader>
                  {/* {SpinnerIcon(this.state.loading)} */}
                  <CardBody
                    style={{ height: "500px" }}
                    className="p-0 m-0 pre-scrollable"
                  >
                    {this.state.expenses.length > 0 ? (
                      <ExpenseTable
                        state={this.state}
                        expenses={this.state.expenses}
                        removeExpense={this.removeExpenseHandler}
                      />
                    ) : (
                      <div className="mx-auto w-50 text-center mt-5">
                        {" "}
                        You have no expenses
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Col>
              <div className="small p-3" id="snackbar">
                Added Expense
              </div>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withAuth(App);
