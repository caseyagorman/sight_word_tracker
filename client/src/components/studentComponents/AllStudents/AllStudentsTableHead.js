import React, { Component } from "react";
import { Table } from "reactstrap";
import AllStudentsTableRows from "./AllStudentsTableRows";

// Display table head of words students are learning

class AllStudentsTableHead extends Component {
  displayTableHead(students) {
    return (
      <div>
        <Table bordered hover striped>
          <thead>
            <th>
              <h4>Name</h4>
            </th>
            <th>
              <h4>Unlearned Words Count</h4>
            </th>
            <th>
              <h4>Unlearned Letters Count</h4>
            </th>
          </thead>
          {this.displayTableRows(students)}
        </Table>
      </div>
    );
  }

  displayTableRows(students) {
    if (!students) {
      return <p>loading...</p>;
    }
    return students.map(students => AllStudentsTableRows(students));
  }

  render() {
    return (
      <div>
        <div>{this.displayTableHead(this.props.students)}</div>
      </div>
    );
  }
}

export default AllStudentsTableHead;
