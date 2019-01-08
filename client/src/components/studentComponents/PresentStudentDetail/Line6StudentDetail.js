import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
// import StudentWordDoughnutChart from "../../StudentWordTestResultsComponents/StudentCharts/StudentWordDoughnutChart";
// import StudentLetterDoughnutChart from "../../StudentLetterTestResultsComponents/StudentCharts/StudentLetterDoughnutChart";
import TotalSoundsDoughnutChart from "../../StudentSoundTestResultsComponents/StudentCharts/TotalSoundsDoughnutChart";
import "../../../static/StudentStyle.css";
class Line10 extends Component {
  componentDidMount() {
    console.log("line 10 props", this.props);
  }
  //   displayWordDoughnutChart(studentTest) {
  //     if (!studentTest) {
  //       return <p>loading...</p>;
  //     }
  //     let test = studentTest[2];
  //     return <StudentWordDoughnutChart dataResults={test} />;
  //   }

  //   displayLetterDoughnutChart(studentTest) {
  //     if (!studentTest) {
  //       return <p>loading...</p>;
  //     }
  //     let test = studentTest[2];
  //     return <StudentLetterDoughnutChart dataResults={test} />;
  //   }

  displayTotalSoundDoughnutChart(studentTest) {
    console.log("student test", studentTest);
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
            {/* {this.displayWordDoughnutChart(this.props.studentWordTestResults)} */}
          </Col>
          <Col lg="4">
            {/* {this.displayLetterDoughnutChart(
              this.props.studentLetterTestResults
            )} */}
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
export default Line10;
