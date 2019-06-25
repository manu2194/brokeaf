import React, { Component } from "react";
import {
  Input,
  Button,
  Form,
  FormGroup,
  Label,
  Alert,
  Col,
  Row
} from "reactstrap";
import ShakeAnimation from "../utilities/ShakeAnimation";

import AuthHelperMethods from "../utilities/AuthHelperMethods";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  Auth = new AuthHelperMethods();
  SA = new ShakeAnimation();

  handleInputChange = event => {
    //console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  displaySignupError() {
    var emailInput = document.getElementById("signup-failed-alert");
    emailInput.style.visibility = "visible";
    this.SA.shake(emailInput, 1, false);
    this.setState({ loginFailed: true });
  }
  handleSubmit = event => {
    event.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/api/users", user)
      .then(res => {
        console.log(res.data);
        this.props.history.replace("/login");
      })
      .catch(err => {
        this.displaySignupError();
        console.log(err);
      });
  };
  componentDidMount() {
    console.log(this.Auth.loggedIn());
    if (this.Auth.loggedIn()) {
      this.props.history.push("/");
    } else {
      document.getElementById("name-field").focus();
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="login-bg" />
        <div className="container-fluid signup">
          <Row className="p-3">
            <Col sm={4} />
            <Col sm={4}>
              <div className="signup-box mt-5 text-warning">
                <Row>
                  <h2
                    style={{ textShadow: "0 0 9px rgba(0,0,0,0.5)" }}
                    className="text-light mx-auto"
                  >
                    Signup
                  </h2>
                </Row>
                <Row>
                  <Alert
                    id="signup-failed-alert"
                    color="danger"
                    className="p-1 small w-100 mb-0"
                    style={{ visibility: "hidden" }}
                  >
                    Oops! The email you entered is already in use.
                  </Alert>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Label className="small text-light" for="name-field">
                      Name
                    </Label>

                    <Input
                      type="text"
                      name="name"
                      className="text-dark signup-input input-login"
                      id="name-field"
                      placeholder="Enter your full name"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup row>
                    <Label className="small text-light" for="email-field">
                      Email
                    </Label>

                    <Input
                      type="email"
                      name="email"
                      className="text-dark signup-input input-login"
                      id="email-field"
                      placeholder="Enter your Email"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup row>
                    <Label className="small text-light" for="password-field">
                      Password
                    </Label>

                    <Input
                      type="password"
                      name="password"
                      className="text-dark signup-input input-login"
                      id="password-field"
                      placeholder="Enter your Password"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup row>
                    <Button className="btn-block mt-3" color="custom">
                      Signup
                    </Button>
                  </FormGroup>
                </Form>
                <Row>
                  <Link className="small text-light ml-0" to="/login">
                    Already have an account? Login here
                  </Link>
                </Row>
              </div>
            </Col>
            <Col sm={4} />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
