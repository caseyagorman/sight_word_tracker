import React from "react";
// import { Link } from "react-router-dom";

const StudentPage = props => (
  <div key={props.data.student_id}>
    <br />
    <h1>
      {props.data[0].fname} {props.data[0].lname}
    </h1>
    <br />
  </div>
);

export default StudentPage;
