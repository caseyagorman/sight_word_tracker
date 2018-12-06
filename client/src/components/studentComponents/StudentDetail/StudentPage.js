import React from "react";

const StudentPage = props => (
  <div>
    <div key={props.data.student_id}>
      <h1>
        {props.data[0].fname} {props.data[0].lname}
      </h1>
      <br />
    </div>
  </div>
);

export default StudentPage;
