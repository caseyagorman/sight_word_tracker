import React from "react";
import { Link } from "react-router-dom";
import "../../../static/StudentStyle.css";
const LetterTestStudentLink = props => {
  return (
    <div className="container">
      <Link to={`/test-student-letters/${props[0].student_id}`}>
        <button id="test-student-button">
          Test {props[0].fname}'s Letters
        </button>
      </Link>
    </div>
  );
};

export default LetterTestStudentLink;
