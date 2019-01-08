import React from "react";
import "../../../static/StudentStyle.css";
// Display student name

const StudentNamePage = props => {
  return (
    <h1 id="display-student">
      {props[0].fname} {props[0].lname}
    </h1>
  );
};

export default StudentNamePage;
