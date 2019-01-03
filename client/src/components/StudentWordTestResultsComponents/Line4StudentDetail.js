import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import StudentWordCountsTableHead from "./StudentWordCountsTableHead";
import StudentWordTestResultsTable from "./StudentWordTestResultsTable";
class Line4 extends Component {
  viewStudentWordTestResultsTable(studentWordTestResults) {
    if (!studentWordTestResults) {
      return <p>loading...</p>;
    }
    let testResults = studentWordTestResults[0];

    return <StudentWordTestResultsTable test={testResults} />;
  }

  getWordCounts(studentWordTest) {
    if (!studentWordTest) {
      return <p>loading...</p>;
    }
    let test = studentWordTest[1];
    return <StudentWordCountsTableHead test={test} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="6">
            {this.getWordCounts(this.props.studentWordTestResults)}
          </Col>
          <Col lg="6">
            {this.viewStudentWordTestResultsTable(
              this.props.studentWordTestResults
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Line4;
