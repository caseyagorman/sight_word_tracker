import React from "react";
import { Link } from "react-router-dom";

const ViewWordsPresentation = props => {
  return (
    <div>
      <br />
      <h1>Words</h1>
      <div style={props.divStyle}>
        <Link to={`/add-word`}> Add Word </Link>
      </div>
      <div>
        <br />
      </div>
      <div>{props.words}</div>
    </div>
  );
};

export default ViewWordsPresentation;
