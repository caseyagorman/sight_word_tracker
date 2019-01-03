import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import StudentWordsTableHead from "./StudentWordsTableHead";
import StudentLettersTableHead from "./StudentLettersTableHead";

class Line2 extends Component {
  studentWordsTableHead(student) {
    if (!student) {
      return <p>Loading student words...</p>;
    }
    return <StudentWordsTableHead data={student} />;
  }
  studentLettersTableHead(student) {
    if (!student) {
      return <p>Loading student words...</p>;
    }
    return <StudentLettersTableHead data={student} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">{this.studentWordsTableHead(this.props.student)}</Col>
          <Col lg="4">{this.studentLettersTableHead(this.props.student)}</Col>
        </Row>
      </div>
    );
  }
}
export default Line2;
