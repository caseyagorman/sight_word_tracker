import React from "react";
import { Link } from "react-router-dom";

const ViewLettersButton = props => {
  return (
    <Link to={`/words`}>
      <button className="btn btn-primary btn-lg">View Letters</button>
    </Link>
  );
};

export default ViewLettersButton;
