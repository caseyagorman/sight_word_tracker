import React from "react";

const Student = props => (
  <div key={props.student_id}>
    <li>
      {props.fname} {props.lname}
    </li>
  </div>
);

export default Student;
