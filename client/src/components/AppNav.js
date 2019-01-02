import React from "react";
import { Navbar, NavItem, Nav } from "react-bootstrap";

const AppNav = () => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Early Literacy Tracker</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="/students/">
            Students
          </NavItem>
          <NavItem eventKey={2} href="/letters/">
            Letters
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
