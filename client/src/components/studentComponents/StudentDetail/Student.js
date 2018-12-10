import React from "react";
import { Link } from "react-router-dom";

const Student = props => (
  <div key={props.student_id}>
    <Link to={`/details/${props.student_id}`}>
      {props.fname} {props.lname}
    </Link>
  </div>
);

export default Student;
