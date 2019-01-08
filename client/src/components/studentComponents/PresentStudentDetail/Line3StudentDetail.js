import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import StudentWordsTableHead from "../StudentDetail/StudentWords/StudentWordsTableHead";
import StudentLettersTableHead from "../StudentDetail/StudentLetters/StudentLettersTableHead";
import StudentSoundsTableHead from "../StudentDetail/StudentSounds/StudentSoundsTableHead";

class Line3 extends Component {
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
  studentSoundsTableHead(student) {
    if (!student) {
      return <p>Loading student words...</p>;
    }
    return <StudentSoundsTableHead data={student} />;
  }

  render() {
    return (
      <div className="container" id="student-detail">
        <Row>
          <Col lg="4">{this.studentWordsTableHead(this.props.student)}</Col>
          <Col lg="4">{this.studentLettersTableHead(this.props.student)}</Col>
          <Col lg="4">{this.studentSoundsTableHead(this.props.student)}</Col>
        </Row>
      </div>
    );
  }
}
export default Line3;
