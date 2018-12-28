import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import StudentWordCountsTableHead from "./StudentWordCountsTableHead";
import StudentDoughnutChart from "./StudentDoughnutChart";
const chartStyle = {
  height: "100"
};
class Line3 extends Component {
  componetDidMount() {}

  displayDoughnutChart(studentTest) {
    if (!studentTest) {
      return <p>loading...</p>;
    }
    let test = studentTest[3];
    return <StudentDoughnutChart dataResults={test} />;
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
          <Col lg="4">{this.getWordCounts(this.props.studentTestResults)}</Col>
          <Col lg="8" style={chartStyle}>
            {this.displayDoughnutChart(this.props.studentTestResults)}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Line3;
