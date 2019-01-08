import React from "react";
import { Link } from "react-router-dom";
import "../../../../static/StudentStyle.css";
const AddStudentButton = props => {
  return (
    <Link to={`/add-student`}>
      <button id="add-button">Add Student</button>
    </Link>
  );
};

export default AddStudentButton;
