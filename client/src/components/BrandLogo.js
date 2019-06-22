import React, { Component } from "react";

export default class BrandLogo extends Component {
  /**
   * Returns font-size to be used in element styling
   * @param {string} sizeParam
   */
  size = sizeParam => {
    if (sizeParam) {
      switch (sizeParam) {
        case "sm":
          return "10px";

        case "md":
          return "30px";

        case "lg":
          return "50px";
        case "xl":
          return "60px";
      }
    } else {
      return "10px";
    }
  };

  color = colorParam => {
    if (colorParam === "light") {
      return "logo-light";
    } else if (colorParam === "dark") {
      return "logo-dark";
    } else {
      return "logo-dark";
    }
  };
  render() {
    return (
      <React.Fragment>
        <h1
          id="logo"
          style={{ fontSize: this.size(this.props.size) }}
          className={this.color(this.props.color) + " " + this.props.className}
        >
          {/* <img src={logo} alt={"Logo"} /> */}
          Broke<span>AF</span>
        </h1>
      </React.Fragment>
    );
  }
}
