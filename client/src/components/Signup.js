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
        <Row>
          <Col sm="2" />
          <Col sm="8">
            <Card color="dark" className="text-warning">
              <CardHeader>
                <h3>Sign Up</h3>

                <span>
                  <Link to="/login">Already have an account? Login here</Link>
                </span>
              </CardHeader>

              <CardBody className="p-5">
                <Alert
                  id="signup-failed-alert"
                  color="danger"
                  style={{ display: "none" }}
                >
                  Sign Up Failed
                </Alert>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Label for="name-field">Name</Label>

                    <Input
                      type="text"
                      name="name"
                      className="text-light expense-input"
                      id="name-field"
                      placeholder="Enter your full name"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup row>
                    <Label for="email-field">Email</Label>

                    <Input
                      type="email"
                      name="email"
                      className="text-light expense-input"
                      id="email-field"
                      placeholder="Enter your Email"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup row>
                    <Label for="password-field">Password</Label>

                    <Input
                      type="password"
                      name="password"
                      className="text-light expense-input"
                      id="password-field"
                      placeholder="Enter your Password"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup row>
                    <Button className="btn-block mt-3" color="warning">
                      Submit
                    </Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col sm="2" />
        </Row>
      </div>
    );
  }
}
