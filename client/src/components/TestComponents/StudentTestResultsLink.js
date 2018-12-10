import React from "react";
import { Link } from "react-router-dom";

const StudentTestResultsLink = props => {
  return (
    <div>
      <Link to={`/student-test-results/${props.data[0].student_id}`}>
        View {props.data[0].fname}'s Test Results
      </Link>
    </div>
  );
};

export default StudentTestResultsLink;
