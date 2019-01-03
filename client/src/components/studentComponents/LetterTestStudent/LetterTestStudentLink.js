import React from "react";
import { Link } from "react-router-dom";

const LetterTestStudentLink = props => {
  return (
    <div className="container">
      {/* <Link to={`/test-student-letters/${props[0].student_id}`}>
        <button className="btn btn-primary btn-lg">
          Test {props[0].fname}
        </button>
      </Link> */}
    </div>
  );
};

export default LetterTestStudentLink;
