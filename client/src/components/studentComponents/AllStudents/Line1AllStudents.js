import React from "react";
import TableContainer from "../../TableContainer/TableContainer";
import StudentTableComponent from "../../TableContainer/StudentTableComponent";

class Line1 extends React.Component {
  displayTableHead(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return (
      <TableContainer
        token={this.props.token}
        renderTable={StudentTableComponent}
        tableElements={students}
      />
    );
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
