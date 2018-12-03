import React from "react";
import { Link } from "react-router-dom";

const TestStudentLink = props => {
  return (
    <div>
      <Link to={`/test-student/${props.data[0].student_id}`}>
        Test {props.data[0].fname}
      </Link>
    </div>
  );
};

export default TestStudentLink;