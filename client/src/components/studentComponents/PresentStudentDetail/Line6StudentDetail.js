import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import WordLineChart from "../../StudentWordTestResultsComponents/StudentCharts/WordLineChart";
import LetterLineChart from "../../StudentLetterTestResultsComponents/StudentCharts/LetterLineChart";
import SoundLineChart from "../../StudentSoundTestResultsComponents/StudentCharts/SoundLineChart";
class Line7 extends Component {
  componetDidMount() {}

  displayWordLineChart(studentTest) {
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
  displaySoundLineChart(studentTest) {
    if (!studentTest) {
      return <p>loading...</p>;
    }
    let tests = studentTest[0];
    return <SoundLineChart tests={tests} />;
  }

  render() {
    return (
      <div className="container" id="student-detail">
        <Row>
          <Col lg="4">
            {this.displayWordLineChart(this.props.studentWordTestResults)}
          </Col>
          <Col lg="4">
            {this.displayLetterLineChart(this.props.studentLetterTestResults)}
          </Col>
          <Col lg="4">
            {this.displaySoundLineChart(this.props.studentSoundTestResults)}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Line7;
