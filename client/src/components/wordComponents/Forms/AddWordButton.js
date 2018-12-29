import React from "react";
import { Link } from "react-router-dom";

const AddWordButton = props => {
  return (
    <div>
      <Link to={`/add-word`}>
        <button className="btn btn-primary btn-lg">Add Word</button>
      </Link>
    </div>
  );
};

export default AddWordButton;
