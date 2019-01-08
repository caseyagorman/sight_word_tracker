import React from "react";
import { Link } from "react-router-dom";
import "../../../static/WordStyle.css";
const ViewChartsButton = props => {
  return (
    <Link to={`/word-charts`}>
      <button id="view-charts-button">View Charts</button>
    </Link>
  );
};

export default ViewChartsButton;
