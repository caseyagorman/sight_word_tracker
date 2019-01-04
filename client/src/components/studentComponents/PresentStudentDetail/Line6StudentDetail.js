import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import WordLineChart from "../../StudentWordTestResultsComponents/WordLineChart";
import LetterLineChart from "../../StudentWordTestResultsComponents/WordLineChart";
class Line7 extends Component {
  componetDidMount() {}

  displayWordLineChart(studentTest) {
    console.log("display word line chart", studentTest);
    if (!studentTest) {
      return <p>loading...</p>;
    }
    let tests = studentTest[0];
    return <WordLineChart tests={tests} />;
  }

  displayLetterLineChart(studentTest) {
    if (!studentTest) {
      return <p>loading...</p>;
    }
    let tests = studentTest[0];
    return <LetterLineChart tests={tests} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="6">
            {this.displayWordLineChart(this.props.studentWordTestResults)}
          </Col>
          <Col lg="6">
            {/* {this.displayLetterLineChart(this.props.studentLetterTestResults)} */}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Line7;
