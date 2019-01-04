import React from "react";
import AllStudentsTableHead from "./AllStudentsTableHead";

class Line1 extends React.Component {
  displayTableHead(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <AllStudentsTableHead students={students} />;
  }

  render() {
    return (
      <div className="container">
        {this.displayTableHead(this.props.students)}
      </div>
    );
  }
}

export default Line1;
