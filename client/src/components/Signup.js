import React, { Component } from "react";
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
  Col,
  Row
} from "reactstrap";
import logo from "../static/brandon.png";
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

  handleInputChange = event => {
    //console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

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
        document.getElementById("signup-failed-alert").style.display = "block";
        console.log(err);
      });
  };
  componentDidMount() {
    console.log(this.Auth.loggedIn());
    if (this.Auth.loggedIn()) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="login-bg" />
        <Row className="p-3">
          <Col sm={4} />
          <Col sm={4}>
            <div className="signup-box mt-5 text-warning">
              <Row>
                <h2 className="text-warning mx-auto">Signup</h2>
              </Row>

              <Alert
                id="signup-failed-alert"
                color="danger"
                style={{ display: "none" }}
              >
                Sign Up Failed
              </Alert>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                  <Label className="small" for="name-field">
                    Name
                  </Label>

                  <Input
                    type="text"
                    name="name"
                    className="text-light signup-input"
                    id="name-field"
                    placeholder="Enter your full name"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup row>
                  <Label className="small" for="email-field">
                    Email
                  </Label>

                  <Input
                    type="email"
                    name="email"
                    className="text-light signup-input"
                    id="email-field"
                    placeholder="Enter your Email"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup row>
                  <Label className="small" for="password-field">
                    Password
                  </Label>

                  <Input
                    type="password"
                    name="password"
                    className="text-light signup-input"
                    id="password-field"
                    placeholder="Enter your Password"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup row>
                  <Button className="btn-block mt-3" color="warning">
                    Signup
                  </Button>
                </FormGroup>
              </Form>
              <Row>
                <Link className="small ml-0" to="/login">
                  Already have an account? Login here
                </Link>
              </Row>
            </div>
          </Col>
          <Col sm={4} />
        </Row>
      </div>
    );
  }
}
