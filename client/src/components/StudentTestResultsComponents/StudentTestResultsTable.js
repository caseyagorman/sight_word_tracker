import React, { Component } from "react";
import { Table } from "react-bootstrap";
import StudentTestResultsRows from "./StudentTestResultsRows";
class StudentTestResultsTable extends Component {
  displayTableHead(test) {
    return (
      <div>
        <h3>Past test results</h3>
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
      </div>
    );
  }

  displayStudentTestResultsRows(test) {
    if (!test) {
      return <p>loading...</p>;
    }

    return test.map(test => StudentTestResultsRows(test));
  }

  render() {
    return <div>{this.displayTableHead(this.props.test)}</div>;
  }
}

export default StudentTestResultsTable;
