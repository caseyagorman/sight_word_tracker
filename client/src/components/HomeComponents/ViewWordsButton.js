import React from "react";
import { Link } from "react-router-dom";

const ViewWordsButton = props => {
  return (
    <Link to={`/words`}>
      <button className="btn btn-primary btn-lg">View Words</button>
    </Link>
  );
};

export default ViewWordsButton;
