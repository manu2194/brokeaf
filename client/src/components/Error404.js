import React, { Component } from "react";

import { Link } from "react-router-dom";

import BrandLogo from "../components/BrandLogo";

export default class Error404 extends Component {
  render() {
    return (
      <div id="error-404-background">
        <div id="error-404-text" className="text-dark p-4">
          <div className="login-logo row mb-2">
            <BrandLogo className="mx-auto" size="lg" />
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
