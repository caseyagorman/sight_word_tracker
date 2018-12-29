import React from "react";

const divStyle = {
  fontSize: "100px"
};
// Display student name

const StudentNamePage = props => {
  return (
    <h1 style={divStyle}>
      {props[0].fname} {props[0].lname}
    </h1>
  );
};

export default StudentNamePage;
