import React from "react";
import { Link } from "react-router-dom";
import "../../../static/LetterStyle.css";
const ViewChartsButton = props => {
  return (
    <Link to={`/letter-charts`}>
      <button id="view-charts-button">View Charts</button>
    </Link>
  );
};

export default ViewChartsButton;
