import React from "react";
import { Link } from "react-router-dom";

const TestStudentLink = props => {
  return (
    <div>
      <Link to={`/test-student/${props[0].student_id}`}>
        Test {props[0].fname}
      </Link>
    </div>
  );
};

export default TestStudentLink;