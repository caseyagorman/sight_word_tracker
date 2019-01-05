import React from "react";
import AllStudentsTable from "./AllStudentsTable";

class Line1 extends React.Component {
  displayTableHead(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <AllStudentsTable students={students} />;
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
