import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Form,
  FormGroup,
  Label,
  Alert
} from "reactstrap";
import AuthHelperMethods from "../utilities/AuthHelperMethods";

export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  Auth = new AuthHelperMethods();

  handleInputChange = event => {
    const target = event.target;
    if (target.id === "email") {
      this.setState({ email: target.value });
    } else {
      if (target.id === "password") {
        this.setState({ password: target.value });
      }
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        if (res === false) {
          return alert("Credentials don't exist");
        }
        this.props.history.replace("/");
      })
      .catch(err => {
        document.getElementById("login-failed-alert").style.display = "block";
      });
  };

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace("/");
    }
  }

  render() {
    return (
      <Card
        color="dark"
        style={{ width: "40%" }}
        className="mx-auto mt-5 text-warning shadow-lg"
      >
        <CardHeader>
          <h3>Login</h3>
        </CardHeader>

        <CardBody className="p-5">
          <Alert
            id="login-failed-alert"
            color="danger"
            style={{ display: "none" }}
          >
            Email or password does not exist
          </Alert>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="email">Enter your email</Label>
              <Input
                className="text-light expense-input mb-2"
                id="email"
                onChange={this.handleInputChange}
                required={true}
                type="email"
              />
              <Label for="password">Enter your password</Label>
              <Input
                className="text-light expense-input"
                id="password"
                type="password"
                onChange={this.handleInputChange}
                required={true}
              />
            </FormGroup>
            <Button className="btn-block" color="warning" type="submit">
              Login
            </Button>
          </Form>
          <div className="mt-4">
            <Link to="/signup">
              <span>
                Don't have an account yet?
                <span className="font-weight-bold">Signup here.</span>
              </span>
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  }
}
