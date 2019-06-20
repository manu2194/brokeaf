import React, { Component } from "react";
import lostimage from "../images/error404.jpg";
import { Link } from "react-router-dom";
import logo from "../static/brandon.png";

export default class Error404 extends Component {
  render() {
    return (
      <div id="error-404-background">
        <div id="error-404-text" className="text-dark p-4">
          <div className="login-logo row mb-2">
            <h1 id="logo" style={{ fontSize: "50px" }} className="mx-auto">
              <img src={logo} alt={"Logo"} />
              Broke<span>AF</span>
            </h1>
          </div>
          <h2 className="text-light">
            <span className="font-weight-bold">Error 404</span>: Page Not Found
          </h2>
          <Link className="text-warning" to="/">
            Go back to homepage
          </Link>
        </div>
      </div>
    );
  }
}
