import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const ViewLettersButton = props => {
  return (
    <Link to={`/words`}>
      <button id="ViewLettersButton">View Letters</button>
    </Link>
  );
};

export default ViewLettersButton;
