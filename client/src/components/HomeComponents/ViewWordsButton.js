import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const ViewWordsButton = props => {
  return (
    <Link to={`/words`}>
      <button id="ViewWordsButton">View Words</button>
    </Link>
  );
};

export default ViewWordsButton;
