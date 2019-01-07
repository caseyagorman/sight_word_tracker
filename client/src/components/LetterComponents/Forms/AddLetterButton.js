import React from "react";
import { Link } from "react-router-dom";

const AddLetterButton = props => {
  return (
    <div>
      <Link to={`/add-letter`}>
        <button id="add-letter-button">Add Letter</button>
      </Link>
    </div>
  );
};

export default AddLetterButton;
