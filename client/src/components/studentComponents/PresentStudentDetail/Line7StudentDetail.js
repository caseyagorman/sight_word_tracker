import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import StudentWordCountsTableHead from "../../StudentWordTestResultsComponents/StudentWordCountsTableHead";
// import StudentLetterCountsTableHead from "../../StudentLetterTestResultsComponents/StudentLetterCountsTableHead";
class Line6 extends Component {
  getWordCounts(studentWordTest) {
    if (!studentWordTest) {
      return <p>loading...</p>;
    }
    let test = studentWordTest[1];
    return <StudentWordCountsTableHead test={test} />;
  }

  // getLetterCounts(studentLetterTest) {
  //   if (!studentLetterTest) {
  //     return <p>loading...</p>;
  //   }
  //   let test = studentLetterTest[1];
  //   return <StudentLetterCountsTableHead test={test} />;
  // }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="6">
            {this.getWordCounts(this.props.studentWordTestResults)}
          </Col>
          <Col lg="6">
            {/* {this.getLetterCounts(this.props.studentLetterTestResults)} */}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Line6;
