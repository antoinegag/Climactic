import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";

const NavBar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="nav" color="dark" dark expand="md">
        <NavbarBrand href="/" className="mr-auto">
          <img alt="logo" height="32px" src="logo-96.png" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav>
            <NavLink tag={Link} className="text-white" to="/">
              <i className="fa fa-tachometer" /> Dashboard
            </NavLink>
            <NavLink tag={Link} className="text-white" to="/stats">
              <i className="fa fa-thermometer-three-quarters" /> Statistics
            </NavLink>
            <NavLink tag={Link} className="text-white" to="/settings">
              <i className="fa fa-cog" /> Settings
            </NavLink>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink
                target="_blank"
                href="//github.com/antoinegag/random-image-bot"
              >
                <i className="fa fa-2x fa-github" />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
