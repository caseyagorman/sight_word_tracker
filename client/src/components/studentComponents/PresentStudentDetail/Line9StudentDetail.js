import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import StudentWordTestResultsTable from "../../StudentWordTestResultsComponents/StudentWordTestResultsTable";
import StudentLetterTestResultsTable from "../../StudentLetterTestResultsComponents/StudentLetterTestResultsTable";
import StudentSoundTestResultsTable from "../../StudentSoundTestResultsComponents/StudentSoundTestResultsTable";
class Line9 extends Component {
  viewStudentWordTestResultsTable(studentWordTestResults) {
    if (!studentWordTestResults) {
      return <p>loading...</p>;
    }
    let testResults = studentWordTestResults[0];

    return <StudentWordTestResultsTable test={testResults} />;
  }

  viewStudentLetterTestResultsTable(studentLetterTestResults) {
    if (!studentLetterTestResults) {
      return <p>loading...</p>;
    }
    let testResults = studentLetterTestResults[0];

    return <StudentLetterTestResultsTable test={testResults} />;
  }

  viewStudentSoundTestResultsTable(studentSoundTestResults) {
    if (!studentSoundTestResults) {
      return <p>loading...</p>;
    }
    let testResults = studentSoundTestResults[0];

    return <StudentSoundTestResultsTable test={testResults} />;
  }
  render() {
    return (
      <div className="container" id="student-detail">
        <Row>
          <Col lg="4">
            {this.viewStudentWordTestResultsTable(
              this.props.studentWordTestResults
            )}
          </Col>
          <Col lg="4">
            {this.viewStudentLetterTestResultsTable(
              this.props.studentLetterTestResults
            )}
          </Col>
          <Col lg="4">
            {this.viewStudentSoundTestResultsTable(
              this.props.studentSoundTestResults
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Line9;
