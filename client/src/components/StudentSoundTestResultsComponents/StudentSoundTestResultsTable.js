import React, { Component } from "react";
import { Table } from "react-bootstrap";
// import StudentWordTestResultsRows from "./StudentWordTestResultsRows";
class StudentSoundTestResultsTable extends Component {
  displayTableHead(test) {
    return (
      <div>
        <h3>Past Word Test Results</h3>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Test taken</th>
              <th>Score</th>
              <th>Correct sounds</th>
              <th>Incorrect sounds</th>
            </tr>
          </thead>
          {/* {this.displayStudentWordTestResultsRows(test)} */}
        </Table>
      </div>
    );
  }

  displayStudentWordTestResultsRows(test) {
    if (!test) {
      return <p>loading...</p>;
    }

    // return test.map(test => StudentWordTestResultsRows(test));
  }

  render() {
    return <div>{this.displayTableHead(this.props.test)}</div>;
  }
}

export default StudentSoundTestResultsTable;
