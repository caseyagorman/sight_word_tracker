import React from "react";
import { Link } from "react-router-dom";

const ViewSoundsButton = props => {
  return (
    <Link to={`/sounds`}>
      <button className="btn btn-primary btn-lg">View Sounds</button>
    </Link>
  );
};

export default ViewSoundsButton;
