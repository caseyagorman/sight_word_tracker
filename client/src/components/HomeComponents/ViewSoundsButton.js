import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const ViewSoundsButton = props => {
  return (
    <Link to={`/sounds`}>
      <button id="ViewSoundsButton">View Sounds</button>
    </Link>
  );
};

export default ViewSoundsButton;
