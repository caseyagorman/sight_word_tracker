import React from "react";
import { Link } from "react-router-dom";
import "../../static/HomeStyle.css";
const ViewLettersButton = props => {
  return (
    <Link to={`/letters`}>
      <button id="ViewLettersButton">View Letters</button>
    </Link>
  );
};

export default ViewLettersButton;
