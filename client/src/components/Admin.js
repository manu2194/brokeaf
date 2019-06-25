import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardDeck,
  Button,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Badge,
  Row,
  Col
} from "reactstrap";
import AuthHelperMethods from "../utilities/AuthHelperMethods";
const Auth = new AuthHelperMethods();
const axios = require("axios");

function removeButton(expense, object) {
  return (
    <Button
      id={`delete-expense-${expense._id}`}
      type="button"
      className="rounded-circle border-0"
      color="outline-danger"
      size="md"
      onClick={() => object.removeExpenseHandler(expense._id)}
    >
      &times;
    </Button>
  );
}

export default class Admin extends Component {
  state = {
    confirm: "",
    loaded: false,
    users: []
  };
  removeExpenseHandler = removeId => {
    const config = {
      params: {
        _id: removeId
      },
      headers: {
        "x-auth-token": Auth.getToken()
      }
    };
    axios
      .delete(`/api/auth/user/${removeId}`, config)
      .then(res => {
        console.log(res);
        this.componentDidMount();
      })
      .catch(err => {
        console.log("Cannot delete item!\n" + err);
      });
  };
  componentDidMount() {
    if (!Auth.loggedIn()) {
      this.props.history.replace("/login");
    } else {
      try {
        const confirm = Auth.getConfirm();
        if (confirm.id !== "5d0726a64ba3f90017e3ee05") {
          Auth.logout();
          this.props.history.replace("/login");
        }
        this.setState({ confirm: confirm, loaded: true });
        axios
          .get("/api/auth/allusers", {
            headers: {
              "x-auth-token": Auth.getToken()
            }
          })
          .then(res => {
            const users = res.data;

            this.setState({ users });
          });

        //get users
      } catch (err) {
        console.log(err);
        Auth.logout();
        this.props.history.replace("/login");
      }
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="login-bg" />
        <div className="container-fluid p-5">
          <h2 className="text-light">Welcome, Manu.</h2>

          <Card className="card-custom">
            <CardHeader className="shadow">
              <div>
                All Users{"                "}
                <Badge pill>{this.state.users.length}</Badge>
              </div>{" "}
            </CardHeader>
            <CardBody className="pre-scrollable" style={{ height: "500px" }}>
              {this.state.users.map(user => (
                <ListGroup flush key={user._id}>
                  <ListGroupItem style={{ background: "none" }}>
                    <ListGroupItemHeading>
                      <div>
                        <h6 className="font-weight-bold">{user.email} </h6>
                        <Badge pill color="primary">
                          {user.expense.length}
                        </Badge>
                      </div>
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                      <ListGroup flush>
                        {user.expense.map(eachExpense => (
                          <ListGroupItem
                            className="expense-list-item"
                            key={eachExpense._id}
                          >
                            {removeButton(eachExpense, this)}
                            {eachExpense.item}, ${eachExpense.amount}
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    </ListGroupItemText>
                  </ListGroupItem>
                </ListGroup>
              ))}
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}
