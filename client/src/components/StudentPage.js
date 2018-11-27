import React from "react";
// import { Link } from "react-router-dom";

const StudentPage = props => (
  <div key={props.data.student_id}>
    {props.data[0].fname} {props.data[0].lname}
  </div>
);

export default StudentPage;
