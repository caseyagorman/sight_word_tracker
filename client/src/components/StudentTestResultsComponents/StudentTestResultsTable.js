import React, { Component } from "react";
import { Table } from "react-bootstrap";
import StudentTestResultsRows from "./StudentTestResultsRows";
class StudentTestResultsTable extends Component {
  displayTableHead(test) {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Test taken</th>
            <th>Score</th>
            <th>Correct words</th>
            <th>Incorrect words</th>
          </tr>
        </thead>
        {this.displayStudentTestResultsRows(test)}
      </Table>
    );
  }

  displayStudentTestResultsRows(test) {
    console.log("display student test table", test);
    if (!test) {
      return <p>loading...</p>;
    }

    return test.map(test => StudentTestResultsRows(test));
  }

  render() {
    return (
      <div>
        <div>{this.displayTableHead(this.props.test)}</div>
      </div>
    );
  }
}

export default StudentTestResultsTable;
