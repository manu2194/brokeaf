import React, { Component } from "react";

export default class HamburgerMenu extends Component {
  state = {
    isOpen: false
  };

  handleToggle = event => {
    var hamburgerElement = document.getElementById("navbar-hamburger");
    hamburgerElement.classList.toggle("change");
  };

  render() {
    return (
      <button
        id="navbar-hamburger"
        className="navbar-toggler hamburger"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
        onClick={this.props.onClick}
      >
        <span>
          <div className="bar1" />
          <div className="bar2" />
          <div className="bar3" />
        </span>
      </button>
    );
  }
}
