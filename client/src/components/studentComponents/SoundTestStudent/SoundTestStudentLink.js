import React from "react";
import { Link } from "react-router-dom";

const SoundTestStudentLink = props => {
  return (
    <div className="container">
      <Link to={`/test-student-words/${props[0].student_id}`}>
        <button className="btn btn-primary btn-lg">
          Test {props[0].fname}'s sounds
        </button>
      </Link>
    </div>
  );
};

export default SoundTestStudentLink;
