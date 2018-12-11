import React from "react";

const StudentPage = props => (
  <div>
    <h1>
      {props.data[0].fname} {props.data[0].lname}
    </h1>
    <br />
  </div>
);

export default StudentPage;
