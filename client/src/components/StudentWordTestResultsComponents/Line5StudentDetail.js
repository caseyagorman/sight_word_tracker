import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import StudentDoughnutChart from "./StudentDoughnutChart";
import LineChart from "./LineChart";

class Line5 extends Component {
  componetDidMount() {}

  displayDoughnutChart(studentTest) {
    if (!studentTest) {
      return <p>loading...</p>;
    }
    let test = studentTest[2];
    return <StudentDoughnutChart dataResults={test} />;
  }

  displaylineChart(studentTest) {
    if (!studentTest) {
      return <p>loading...</p>;
    }
    let tests = studentTest[0];
    return <LineChart tests={tests} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="6">
            {this.displayDoughnutChart(this.props.studentWordTestResults)}
          </Col>
          <Col lg="6">
            {this.displaylineChart(this.props.studentWordTestResults)}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Line5;
