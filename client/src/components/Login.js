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
  Col,
  Jumbotron,
  Container
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
        document.getElementById("login-failed-alert").style.visibility =
          "visible";
      });
  };

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace("/");
    }
  }

  render() {
    return (
      <div className="container-fluid login">
        <div className="login-bg" />
        <Row>
          <Col sm={4} />
          <Col sm={4}>
            <div className="login-box mt-5 text-warning">
              <div className="login-logo row mb-2">
                <h1 id="logo" style={{ fontSize: "50px" }} className="mx-auto">
                  <img src={logo} alt={"Logo"} />
                  Broke<span>AF</span>
                </h1>
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
    );
  }
}
