import React, { Component } from "react";
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

  calculateTotalExpense = () => {
    var sum = 0;
    this.state.expenses.map(expense => {
      sum += parseFloat(expense.amount);
    });
    return sum;
  };

  calculateThisMonthExpenses = () => {
    var currentMonth = new Date(Date.now()).getMonth();
    var thisMonthExpenes = this.state.expenses.filter(
      expense => new Date(expense.date).getMonth() == currentMonth
    );
    var sum = 0;
    thisMonthExpenes.map(element => {
      sum = sum + parseFloat(element.amount);
    });
    return sum;
  };

  totalExpenseBadgeColor = () => {
    if (this.state.expenses.length === 0) {
      return "danger";
    } else {
      return "warning";
    }
  };
  axiosPost = (expenseObject, callback) => {
    expenseObject.forEach(expense => {
      this.setState({ loading: true });
      axios.post("/api/expense", expense).then(res => {
        console.log(res);
      });
    });
    callback();
  };

  handleSubmitExpense = expenseObject => {
    //POST to Backend Epi, each expense Object
    expenseObject.forEach(expense => {
      this.setState({ loading: true });
      //console.log(expense);
      axios
        .post("/api/expenses", expense)
        .then(res => {
          //console.log(res);
          //console.log(res.data);
          //this.componentDidMount();
        })
        .finally(() => {
          this.componentDidMount();
          snackBar();
        });
    });
  };

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
            {/* {this.state.loading ? (
            <Spinner className="mx-auto" size="sm" color="warning" />
          ) : (
            <span />
          )} */}
            <Spinner
              style={{ visibility: this.state.loading ? "visible" : "hidden" }}
              className="mx-auto"
              size="sm"
              color="warning"
            />
            ) : (
            <span />
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
                      color={this.totalExpenseBadgeColor()}
                      className="p-2 float-right"
                      pill
                    >
                      This Month's Expenses:
                      <span className="ml-2">
                        $ {this.calculateThisMonthExpenses()}
                      </span>
                    </Badge>
                  </Col>
                </Row>
              </CardHeader>
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
          <div className="pt-1 pb-1 pr-2 pl-2" id="snackbar">
            Added Expense
          </div>
        </div>
      </div>
    );
  }
}

export default App;
