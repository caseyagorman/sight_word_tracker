import React from "react";
import { Link } from "react-router-dom";
import "../../../static/StudentStyle.css";
const SoundTestStudentLink = props => {
  return (
    <div className="container">
      <Link to={`/test-student-sounds/${props[0].student_id}`}>
        <button id="test-student-button">Test {props[0].fname}'s sounds</button>
      </Link>
    </div>
  );
};

export default SoundTestStudentLink;
