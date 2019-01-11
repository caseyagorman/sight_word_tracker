import React from "react";
import { Link } from "react-router-dom";

const AddWordButton = props => {
  return (
    <Link to={`/add-word`}>
      <button className="add-word-button">Add Words</button>
    </Link>
  );
};

export default AddWordButton;
