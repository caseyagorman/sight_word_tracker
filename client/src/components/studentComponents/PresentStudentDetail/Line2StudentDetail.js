import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import WordTestStudentLink from "../WordTestStudent/WordTestStudentLink";
import LetterTestStudentLink from "../LetterTestStudent/LetterTestStudentLink";
import SoundTestStudentLink from "../SoundTestStudent/SoundTestStudentLink";

class Line2 extends Component {
  WordTestStudentLink(student) {
    if (!student) {
      return <p>Loading test...</p>;
    }
    return WordTestStudentLink(student);
  }

  LetterTestStudentLink(student) {
    if (!student) {
      return <p>Loading test...</p>;
    }
    return LetterTestStudentLink(student);
  }

  SoundTestStudentLink(student) {
    if (!student) {
      return <p>Loading test...</p>;
    }
    return SoundTestStudentLink(student);
  }

  render() {
    return (
      <div className="container" id="student-detail">
        <Row>
          <Col lg="4">{this.WordTestStudentLink(this.props.student)}</Col>
          <Col lg="4">{this.LetterTestStudentLink(this.props.student)}</Col>
          <Col lg="4">{this.SoundTestStudentLink(this.props.student)}</Col>
        </Row>
      </div>
    );
  }
}
export default Line2;
