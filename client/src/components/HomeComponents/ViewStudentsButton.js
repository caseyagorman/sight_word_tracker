import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const ViewStudentsButton = props => {
  return (
    <Link to={`/students`}>
      <button id="ViewStudentsButton">View Students</button>
    </Link>
  );
};

export default ViewStudentsButton;
