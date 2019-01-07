import React from "react";
import { Link } from "react-router-dom";

const AddWordButton = props => {
  return (
    <Link to={`/add-word`}>
      <button id="add-word-button">Add Word</button>
    </Link>
  );
};

export default AddWordButton;
