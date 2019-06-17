import React, { Component } from "react";
import favicon from "../static/favicon.ico";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

class AppNavbar extends Component {
  state = { isOpen: false };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleLogout = event => {
    event.preventDefault();
    this.props.handleLogout();
  };
  render() {
    return (
      <div>
        <Navbar className="shadow-lg" color="dark" dark expand="md">
          <NavbarBrand href="/" className="navbar-brand text-warning">
            <img src={favicon} />
            Broke<span className="font-weight-bold">AF</span>
          </NavbarBrand>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#">Options</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/manu2194">GitHub</NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  onClick={this.handleLogout}
                >
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
