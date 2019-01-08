import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import TotalWordsDoughnutChart from "../../StudentWordTestResultsComponents/StudentCharts/TotalWordsDoughnutChart";
import TotalLettersDoughnutChart from "../../StudentLetterTestResultsComponents/StudentCharts/TotalLettersDoughnutChart";
import TotalSoundsDoughnutChart from "../../StudentSoundTestResultsComponents/StudentCharts/TotalSoundsDoughnutChart";
import "../../../static/StudentStyle.css";
class Line6 extends Component {
  displayWordDoughnutChart(studentTest) {
    if (!studentTest) {
      return <p>loading...</p>;
    }
    let test = studentTest[4];
    return <TotalWordsDoughnutChart dataResults={test} />;
  }

  displayLetterDoughnutChart(studentTest) {
    console.log("student letter test", studentTest);
    if (!studentTest) {
      return <p>loading...</p>;
    }
    let test = studentTest[4];
    return <TotalLettersDoughnutChart dataResults={test} />;
  }

  displayTotalSoundDoughnutChart(studentTest) {
    console.log("sound test", studentTest);
    if (!studentTest) {
      return <p>loading...</p>;
    }
    let test = studentTest[4];
    return <TotalSoundsDoughnutChart dataResults={test} />;
  }

  render() {
    return (
      <div className="container" id="student-detail">
        <Row>
          <Col lg="4">
            {this.displayWordDoughnutChart(this.props.studentWordTestResults)}
          </Col>
          <Col lg="4">
            {this.displayLetterDoughnutChart(
              this.props.studentLetterTestResults
            )}
          </Col>
          <Col lg="4">
            {this.displayTotalSoundDoughnutChart(
              this.props.studentSoundTestResults
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Line6;
