import React, { Component } from "react";
import favicon from "../static/favicon.ico";
import BrandLogo from "../components/BrandLogo";
import HamburgerMenu from "../components/HamburgerMenu";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

class AppNavbar extends Component {
  state = { isOpen: false };

  toggle = () => {
    var hamburgerElement = document.getElementById("navbar-hamburger");
    hamburgerElement.classList.toggle("change");
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
        <Navbar
          className="sticky-top shadow-sm "
          color="custom"
          dark
          expand="md"
        >
          <NavbarBrand href="/" id="logo" className="navbar-brand text-warning">
            {/* <img src={favicon} />
            Broke<span>AF</span> */}
            <BrandLogo size="md" color="light" />
          </NavbarBrand>

          {/* <NavbarToggler onClick={this.toggle} /> */}
          <HamburgerMenu onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/* <NavItem>
                <NavLink href="#">Options</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/manu2194/brokeaf">
                  GitHub
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink style={{ cursor: "pointer" }} disabled>
                  Help
                </NavLink>
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
