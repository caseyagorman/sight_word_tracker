import React from "react";
import { Link } from "react-router-dom";
import "../../../../static/StudentStyle.css";
const AddStudentButton = props => {
  return (
    <div>
      <Link to={`/add-student`}>
        <button id="add-student-button">Add Student</button>
      </Link>
    </div>
  );
};

export default AddStudentButton;
