import React from "react";
import { Link } from "react-router-dom";
import "../../../static/SoundStyle.css";
const ViewChartsButton = props => {
  return (
    <Link to={`/sound-charts`}>
      <button id="view-charts-button">View Charts</button>
    </Link>
  );
};

export default ViewChartsButton;
