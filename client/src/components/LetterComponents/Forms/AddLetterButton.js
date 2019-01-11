import React from "react";
import { Link } from "react-router-dom";

const AddLetterButton = props => {
  return (
    <Link to={`/add-letter`}>
      <button className="add-letter-button">Add Letters</button>
    </Link>
  );
};

export default AddLetterButton;
