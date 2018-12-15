import React from "react";

const StudentPage = props => (
  <div>
    <h1>
      {props[0].fname} {props[0].lname}
    </h1>
    <br />
  </div>
);

export default StudentPage;
