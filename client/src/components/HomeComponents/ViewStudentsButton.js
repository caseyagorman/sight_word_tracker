import React from "react";
import { Link } from "react-router-dom";

const ViewStudentsButton = props => {
  return (
    <Link to={`/students`}>
      <button className="btn btn-primary btn-lg">View Students</button>
    </Link>
  );
};

export default ViewStudentsButton;
