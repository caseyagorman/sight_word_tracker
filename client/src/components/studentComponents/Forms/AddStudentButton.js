import React from "react";
import { Link } from "react-router-dom";

const AddStudentButton = props => {
  return (
    <div>
      <Link to={`/add-student`}>
        <button className="btn btn-primary btn-lg">Add Student</button>
      </Link>
    </div>
  );
};

export default AddStudentButton;
