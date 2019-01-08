import React from "react";
import { Link } from "react-router-dom";
import "../../../static/StudentStyle.css";
const WordTestStudentLink = props => {
  return (
    <div className="container">
      <Link to={`/test-student-words/${props[0].student_id}`}>
        <button id="test-student-button">Test {props[0].fname}' words</button>
      </Link>
    </div>
  );
};

export default WordTestStudentLink;
