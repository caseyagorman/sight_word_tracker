import React from "react";
import { Link } from "react-router-dom";

const AddLetterButton = props => {
  return (
    <Link to={`/add-letter`}>
      <button id="add-letter-button">Add Letter</button>
    </Link>
  );
};

export default AddLetterButton;
