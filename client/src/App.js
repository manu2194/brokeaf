import React, { Component } from "react";
import {
  Spinner,
  Button,
  Alert,
  Row,
  Col,
  Toast,
  ToastBody,
  ToastHeader
} from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AppNavbar from "./components/AppNavbar";
import Expense from "./components/Expense";
import ExpenseTable from "./components/ExpenseTable";
import "./static/styles/App.css";
import "./static/scripts";
import "./static/brandon.png";
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
    uid: "",
    expenses: [],
    loading: false,
    alert: false,
    justAdded: "",
    addOrRemove: 0
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
        this.setState({ uid: res.data._id });
        this.setState({ loading: false });
        this.setState({ expenses });
      });
  }

  handleSubmitExpense = expenseObject => {
    //POST to Backend Epi, each expense Object
    const config = {
      headers: {
        "x-auth-token": this.Auth.getToken()
      }
    };
    if (!this.Auth.isTokenExpired()) {
      expenseObject.forEach(expense => {
        this.setState({ loading: true });
        //console.log(expense);

        //need to post the token with the expense object.
        axios
          .post("/api/auth/user", expense, config)
          .then(res => {
            //console.log(res);
            this.setState({ justAdded: expense });
            this.setState({ alert: true, addOrRemove: 0 });
            document.getElementById("expense-field").value = "";
          })
          .catch(err => {
            console.log("Unknown Error occured! Logging out...");
            this._handleLogout();
          })
          .finally(() => {
            this.componentDidMount();
          });
      });
    }
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

        this.state.expenses.forEach(e => {
          if (e._id === removeId) {
            this.setState({ justAdded: e });
          }
        });
        this.state.e;
        this.setState(state => ({
          expenses: state.expenses.filter(expense => expense._id !== removeId)
        }));

        this.setState({ alert: true, addOrRemove: 1 });
      })
      .catch(err => {
        console.log("Cannot delete item!\n" + err);
      });
  };

  isAdmin = () => {
    if (this.state.uid === "5d0726a64ba3f90017e3ee05") {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <div className="login-bg" />
          <AppNavbar handleLogout={this._handleLogout} admin={this.isAdmin()} />

          <div className="container-fluid">
            <Row className="mt-4">
              <Col sm={5} className="mb-4">
                <Expense
                  user={this.state.user}
                  className="shadow-sm card-custom card-border-expense-custom"
                  state={this.state}
                  submitExpense={this.handleSubmitExpense}
                  focusOnLoad={true}
                />
              </Col>

              <Col sm={7} className="mb-4">
                <ExpenseTable
                  className="shadow-sm card-custom card-border-expense-table-custom"
                  state={this.state}
                  expenses={this.state.expenses}
                  removeExpense={this.removeExpenseHandler}
                  height="500px"
                />
              </Col>

              <CSSTransition
                in={this.state.alert}
                timeout={{
                  enter: 500,
                  exit: 200
                }}
                classNames="success-toast"
                unmountOnExit
                onEntered={() => {
                  setTimeout(() => {
                    this.setState({ alert: !this.state.alert });
                  }, 1000);
                }}
              >
                <div
                  className={
                    "bg-dark text-light success-toast shadow p-2 border border-" +
                    (this.state.addOrRemove === 0 ? "success" : "danger")
                  }
                >
                  <small>
                    {this.state.addOrRemove === 0 ? "Added " : "Removed "}{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {this.state.justAdded.item}
                    </span>
                  </small>
                </div>
              </CSSTransition>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withAuth(App);
