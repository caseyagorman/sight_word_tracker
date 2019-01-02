import React from "react";
import { Link } from "react-router-dom";

const AddLetterButton = props => {
  return (
    <div>
      <Link to={`/add-letter`}>
        <button className="btn btn-primary btn-lg">Add Letter</button>
      </Link>
    </div>
  );
};

export default AddLetterButton;
