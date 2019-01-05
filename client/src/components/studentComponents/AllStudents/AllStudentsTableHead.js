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
              <h4>Links</h4>
            </th>
            <th>
              <h4>Learned Words List</h4>
            </th>
            <th>
              <h4>Unlearned Words List</h4>
            </th>
            <th>
              <h4>Learned Letters List</h4>
            </th>
            <th>
              <h4>Unlearned Letters List</h4>
            </th>
            <th>
              <h4>Learned Sounds List</h4>
            </th>
            <th>
              <h4>Unlearned Sounds List</h4>
            </th>
          </thead>
          {this.displayTableRows(students)}
        </Table>
      </div>
    );
  }

  formatLists(list) {
    if (!list) {
      return <div>loading...</div>;
    }
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
