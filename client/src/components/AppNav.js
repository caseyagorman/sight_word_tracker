import React from "react";
import { Link } from "react-router-dom";
import Logout from "./UserComponents/Forms/Logout";
const divStyle = {
  display: "inline"
};
const AppNav = () => {
  return (
    <nav>
      <div style={divStyle}>
        <Link to="/">Home |</Link>
      </div>
      <div style={divStyle}>
        <Link to="/students/">Students |</Link>
      </div>
      <div style={divStyle}>
        <Link to="/words/">Words |</Link>
      </div>
      <div style={divStyle}>
        <Logout />
      </div>
    </nav>
  );
};

export default AppNav;
