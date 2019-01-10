import React, { Component } from "react";
import { Table } from "react-bootstrap";
import StudentLetterTestResultsRows from "./StudentLetterTestResultsRows";
class StudentLetterTestResultsTable extends Component {
  displayTableHead(test) {
    return (
      <div>
        <h3>Past Letter Test Results</h3>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Test taken</th>
              <th>Score</th>
              <th>Correct letters</th>
              <th>Incorrect words</th>
            </tr>
          </thead>
          {this.displayStudentLetterTestResultsRows(test)}
        </Table>
      </div>
    );
  }

  displayStudentLetterTestResultsRows(test) {
    if (!test) {
      return <p>loading...</p>;
    }

    return test.map(test => StudentLetterTestResultsRows(test));
  }

  render() {
    return <div>{this.displayTableHead(this.props.test)}</div>;
  }
}

export default StudentLetterTestResultsTable;
