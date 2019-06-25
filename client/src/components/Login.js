import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  Form,
  FormGroup,
  Label,
  Alert,
  Row,
  Col
} from "reactstrap";

import BrandLogo from "../components/BrandLogo";
import AuthHelperMethods from "../utilities/AuthHelperMethods";
import ShakeAnimation from "../utilities/ShakeAnimation";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    loginFailed: false,
    loggingIn: false
  };

  Auth = new AuthHelperMethods();
  SA = new ShakeAnimation();

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
    this.setButtonText("Logging in");
    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        if (res === false) {
          return alert("Credentials don't exist");
        }
        this.setButtonText("Logged in");
        this.props.history.replace("/");
      })
      .catch(err => {
        this.displayLoginError();
        this.setButtonText("Login");
      });
  };

  displayLoginError() {
    var emailInput = document.getElementById("login-failed-alert");
    emailInput.style.visibility = "visible";
    this.SA.shake(emailInput, 1, false);
    this.setState({ loginFailed: true });
  }
  hideLoginError() {
    document.getElementById("login-failed-alert").style.visibility = "hidden";
  }
  setButtonText(text) {
    var loginButton = document.getElementById("login-button");
    loginButton.innerText = text;
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace("/");
    }
  }

  componentDidMount() {
    document.getElementById("email").focus();
    document.getElementById("password").value = "";
  }

  render() {
    return (
      <React.Fragment>
        <div className="login-bg" />
        <div className="container-fluid login">
          <Row>
            <Col sm={4} />
            <Col sm={4}>
              <div className="login-box mt-5 text-warning">
                <div className="login-logo row mb-1">
                  <BrandLogo className="mx-auto" size="xl" color="light" />
                </div>
                <Alert
                  id="login-failed-alert"
                  className="p-1 small"
                  color="danger"
                  style={{ visibility: "hidden" }}
                >
                  Incorrect email or password
                </Alert>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup className="mx-auto">
                    <Input
                      autoComplete="nope"
                      name="email"
                      className="login-input mb-2 input-login"
                      id="email"
                      onChange={this.handleInputChange}
                      required={true}
                      type="email"
                      placeholder={"Email"}
                      onFocus={this.handleOnFocus}
                    />
                    <Input
                      className="login-input input-login"
                      id="password"
                      type="password"
                      onChange={this.handleInputChange}
                      required={true}
                      placeholder={"Password"}
                    />
                  </FormGroup>
                  <Button
                    id="login-button"
                    className="btn-block"
                    color="custom"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
                <div className="mt-4">
                  <Link to="/signup" className="text-light small">
                    <span className="">
                      Don't have an account yet? Signup here
                    </span>
                  </Link>
                </div>
              </div>
            </Col>
            <Col sm={4} />
          </Row>
          {/* <Row>
          <div className="col">
            <div className=" w-50 mx-auto">
              <Jumbotron className="text-light" style={{ background: "none" }}>
                <h1>Change the way you manage expenses</h1>
                <p className="lead">
                  An easy way to find out how broke you truly are... because you
                  are. Enter all your expenses in a text format and watch them
                  get added automatically into your expense table.
                </p>
              </Jumbotron>
            </div>
          </div>
        </Row> */}
        </div>
      </React.Fragment>
    );
  }
}
