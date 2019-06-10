import React, { Component } from "react";
import { Card, CardBody, CardHeader, Row, Col, Badge } from "reactstrap";
import AppNavbar from "./components/AppNavbar";
import Expense from "./components/Expense";
import ExpenseTable from "./components/ExpenseTable";
import "./App.css";
var axios = require("axios");

class App extends Component {
  state = {
    expenses: []
  };

  componentDidMount() {
    //Called to as soon as Component is rendered
    axios.get("/api/expenses").then(res => {
      const expenses = res.data;
      //Converting MongoDB date format to pretty JavaScript date format
      expenses.map((expense, index) => {
        expenses[index] = {
          _id: expense._id,
          item: expense.item,
          amount: expense.amount,
          date: new Date(expense.date).toLocaleString().split(",")[0]
        };
      });
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

  totalExpenseBadgeColor = () => {
    if (this.state.expenses.length === 0) {
      return "danger";
    } else {
      return "warning";
    }
  };

  handleSubmitExpense = expenseObject => {
    //POST to Backend Epi, each expense Object
    expenseObject.forEach(expense => {
      //console.log(expense);
      axios.post("/api/expenses", expense).then(res => {
        //console.log(res);
        //console.log(res.data);
      });
    });
    //Re Render Component
    this.componentDidMount();
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
        <div className="mt-5 mb-5 mx-auto w-75">
          <Expense
            state={this.state}
            submitExpense={this.handleSubmitExpense}
          />
        </div>
        <Card
          style={{ width: "90%" }}
          color="dark"
          className="mx-auto text-light rounded border border-warning"
        >
          <CardHeader>
            <Row>
              <Col sm="3">Expenses</Col>
              <Col sm="6" />
              <Col sm="3">
                <Badge
                  color={this.totalExpenseBadgeColor()}
                  className="p-2"
                  pill
                >
                  Total Amount:
                  <span className="ml-2">$ {this.calculateTotalExpense()}</span>
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
      </div>
    );
  }
}

export default App;
