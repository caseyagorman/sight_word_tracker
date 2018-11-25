import React from "react";
import { Link } from "react-router-dom";
const AppNav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/students/">Students</Link>
        </li>
        <li>
          <Link to="/words/">Words</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
