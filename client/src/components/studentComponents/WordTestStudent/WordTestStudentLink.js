import React from "react";
import { Link } from "react-router-dom";

const WordTestStudentLink = props => {
  return (
    <div className="container">
      <Link to={`/test-student-words/${props[0].student_id}`}>
        <button className="btn btn-primary btn-lg">
          Test {props[0].fname}' words
        </button>
      </Link>
    </div>
  );
};

export default WordTestStudentLink;
