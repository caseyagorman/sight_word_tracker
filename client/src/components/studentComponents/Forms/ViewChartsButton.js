import React from "react";
import { Link } from "react-router-dom";
import "../../../static/StudentStyle.css";
const ViewChartsButton = props => {
  return (
    <Link to={`/student-charts`}>
      <button id="view-charts-button">View Charts</button>
    </Link>
  );
};

export default ViewChartsButton;
