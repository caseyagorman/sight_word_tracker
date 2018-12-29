import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import StudentWordCountsTableHead from "./StudentWordCountsTableHead";

import StudentTestResultsTable from "./StudentTestResultsTable";
class Line3 extends Component {
  viewStudentTestResults(studentTestResults) {
    if (!studentTestResults) {
      return <p>loading...</p>;
    }
    let testResults = studentTestResults[0];

    return <StudentTestResultsTable test={testResults} />;
  }

  getWordCounts(studentTest) {
    if (!studentTest) {
      return <p>loading...</p>;
    }
    let test = studentTest[1];
    return <StudentWordCountsTableHead test={test} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="6">{this.getWordCounts(this.props.studentTestResults)}</Col>
          <Col lg="6">
            {this.viewStudentTestResults(this.props.studentTestResults)}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Line3;
