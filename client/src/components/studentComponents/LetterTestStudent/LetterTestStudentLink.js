import React from "react";
import { Link } from "react-router-dom";
import "../../../static/StudentStyle.css";

// const LetterTestStudentLink = props => {
const LetterTestStudentLink = ({ student, beginTestHandler }) => {
  // console.log("LetterTestStudent", props);
  console.log("begin handler", beginTestHandler);
  console.log("student as prop", student);

  return (
    <div className="container">
      <Link to={`/test-student-letters/${student[0].student_id}`}>
        <button
          id="test-student-button"
          // onClick={() => beginTestHandler("letter")}
        >
          Test {student[0].fname}'s Letters
        </button>
      </Link>
    </div>
  );
};

export default LetterTestStudentLink;
