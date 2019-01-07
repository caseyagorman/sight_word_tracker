import React from "react";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import "../static/NavStyle.css";

const AppNav = () => {
  return (
    <Navbar collapseOnSelect id="navbar">
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/" id="Brand">
            Home
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem id="Students" eventKey={1} href="/students/">
            Students
          </NavItem>
          <NavItem id="Words" eventKey={2} href="/words/">
            Words
          </NavItem>
          <NavItem id="Letters" eventKey={3} href="/letters/">
            Letters
          </NavItem>
          <NavItem id="Sounds" eventKey={4} href="/sounds/">
            Sounds
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem id="Logout" eventKey={5} href="/logout/">
            Logout
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNav;
