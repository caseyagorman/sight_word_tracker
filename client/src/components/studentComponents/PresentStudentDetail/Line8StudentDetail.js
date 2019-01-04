import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import StudentWordTestResultsTable from "../../StudentWordTestResultsComponents/StudentWordTestResultsTable";
// import StudentLetterTestResultsTable from "../../StudentWordTestResultsComponents/StudentLetterTestResultsTable";
class Line6 extends Component {
  viewStudentWordTestResultsTable(studentWordTestResults) {
    if (!studentWordTestResults) {
      return <p>loading...</p>;
    }
    let testResults = studentWordTestResults[0];

    return <StudentWordTestResultsTable test={testResults} />;
  }

  //   viewStudentLetterTestResultsTable(studentLetterTestResults) {
  //     if (!studentLetterTestResults) {
  //       return <p>loading...</p>;
  //     }
  //     let testResults = studentLetterTestResults[0];

  //     return <StudentLetterTestResultsTable test={testResults} />;
  //   }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="6">
            {this.viewStudentWordTestResultsTable(
              this.props.studentWordTestResults
            )}
          </Col>
          <Col lg="6">
            {/* {this.viewStudentLetterTestResultsTable(
              this.props.studentLetterTestResults
            )} */}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Line6;
