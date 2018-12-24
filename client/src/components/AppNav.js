import React from "react";
import { Link } from "react-router-dom";
import Logout from "./UserComponents/Forms/Logout";
import { Navbar, NavItem, Nav, MenuItem, NavDropdown } from "react-bootstrap";

const AppNav = () => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/Home">Sight Word Tracker</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="/students/">
            Students
          </NavItem>
          <NavItem eventKey={2} href="/words/">
            Words
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="/logout/">
            Logout
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNav;
