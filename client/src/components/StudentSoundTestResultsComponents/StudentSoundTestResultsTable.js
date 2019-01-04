import React, { Component } from "react";
import { Table } from "react-bootstrap";
import StudentSoundTestResultsRows from "./StudentSoundTestResultsRows";
class StudentSoundTestResultsTable extends Component {
  displayTableHead(test) {
    return (
      <div>
        <h3>Past Sound Test Results</h3>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Test taken</th>
              <th>Score</th>
              <th>Correct sounds</th>
              <th>Incorrect sounds</th>
            </tr>
          </thead>
          {this.displayStudentSoundTestResultsRows(test)}
        </Table>
      </div>
    );
  }

  displayStudentSoundTestResultsRows(test) {
    if (!test) {
      return <p>loading...</p>;
    }

    return test.map(test => StudentSoundTestResultsRows(test));
  }

  render() {
    return <div>{this.displayTableHead(this.props.test)}</div>;
  }
}

export default StudentSoundTestResultsTable;
