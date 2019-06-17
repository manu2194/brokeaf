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
  Alert,
  Row,
  Col
} from "reactstrap";
import logo from "../static/brandon.png";
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
      <div className="container-fluid">
        <Row>
          <Col sm={4} />
          <Col sm={4}>
            <div className="login-box mt-5 text-warning">
              <div className="login-logo row mb-5">
                <h1 id="logo" className="text-warning mx-auto">
                  <img src={logo} />
                  Broke<span className="font-weight-bold">AF</span>
                </h1>
              </div>
              <Alert
                id="login-failed-alert"
                className="p-1 small"
                color="danger"
                style={{ display: "none" }}
              >
                Incorrect email or password
              </Alert>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup className="mx-auto">
                  {/* <Label for="email">Enter your email</Label> */}
                  <Input
                    className="login-input mb-2"
                    id="email"
                    onChange={this.handleInputChange}
                    required={true}
                    type="email"
                    placeholder={"Email"}
                  />
                  {/* <Label for="password">Enter your password</Label> */}
                  <Input
                    className="login-input"
                    id="password"
                    type="password"
                    onChange={this.handleInputChange}
                    required={true}
                    placeholder={"Password"}
                  />
                </FormGroup>
                <Button className="btn-block" color="warning" type="submit">
                  Login
                </Button>
              </Form>
              <div className="mt-4">
                <Link to="/signup" className="text-primary small">
                  <span className="">
                    Don't have an account yet? Signup here
                  </span>
                </Link>
              </div>
            </div>
          </Col>
          <Col sm={4} />
        </Row>
      </div>
    );
  }
}
