import React, { Component } from "react";
import brandLogo from "../static/brand.ico";
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
  render() {
    return (
      <div>
        <Navbar className="shadow-lg" color="dark" dark expand="md">
          <NavbarBrand className="text-warning" href="/">
            <img src={brandLogo} />
            Broke<span className="font-weight-bold">AF</span>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-0" navbar>
              <NavItem>
                <NavLink href="#">Options</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/manu2194">GitHub</NavLink>
              </NavItem>
              <NavItem />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
