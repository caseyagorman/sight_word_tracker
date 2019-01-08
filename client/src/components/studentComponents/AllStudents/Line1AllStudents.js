import React from "react";
import AllStudentsTable from "./AllStudentsTable";
import TableContainer from "../../TableContainer/TableContainer";
import StudentTableComponent from "../../TableContainer/StudentTableComponent";

class Line1 extends React.Component {
  displayTableHead(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return (
      <TableContainer
        renderTable={StudentTableComponent}
        tableElements={students}
      />
    );
    // return <AllStudentsTable students={students} />;
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
