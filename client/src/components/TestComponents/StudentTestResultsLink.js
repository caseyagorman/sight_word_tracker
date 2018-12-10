import React from "react";
import { Link } from "react-router-dom";

const StudentTestResultsLink = props => {
  return (
    <div>
      <Link to={`/student-test-results/${props.data[0].student_id}`}>
        View Past Test Results
      </Link>
    </div>
  );
};

export default StudentTestResultsLink;
