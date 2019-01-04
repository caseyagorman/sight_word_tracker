import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import StudentWordDoughnutChart from "../../StudentWordTestResultsComponents/StudentWordDoughnutChart";
import StudentLetterDoughnutChart from "../../StudentLetterTestResultsComponents/StudentLetterDoughnutChart";

class Line5 extends Component {
  componetDidMount() {}

  displayWordDoughnutChart(studentTest) {
    if (!studentTest) {
      return <p>loading...</p>;
    }
    let test = studentTest[2];
    return <StudentWordDoughnutChart dataResults={test} />;
  }

  displayLetterDoughnutChart(studentTest) {
    if (!studentTest) {
      return <p>loading...</p>;
    }
    let test = studentTest[2];
    return <StudentLetterDoughnutChart dataResults={test} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">
            {this.displayWordDoughnutChart(this.props.studentWordTestResults)}
          </Col>
          <Col lg="4">
            {this.displayLetterDoughnutChart(
              this.props.studentLetterTestResults
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Line5;
