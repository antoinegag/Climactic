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
        <NavbarBrand tag={Link} to="/" className="mr-auto">
          <img alt="logo" height="32px" src="logo-96.png" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav>
            <NavLink tag={Link} className="text-white" to="/">
              <i className="fas fa-tachometer-alt" /> Dashboard
            </NavLink>
            <NavLink tag={Link} className="text-white" to="/stations">
              <i className="fas fa-thermometer-three-quarters" /> Stations
            </NavLink>
            <NavLink tag={Link} className="text-white" to="/settings">
              <i className="fas fa-cog" /> Settings
            </NavLink>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink target="_blank" href="//github.com/antoinegag/climactic">
                <i className="fab fa-2x fa-github" />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
