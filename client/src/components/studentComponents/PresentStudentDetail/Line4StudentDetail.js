import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import AddStudentWordForm from "../Forms/Word/AddStudentWordForm";
import AddStudentLetterForm from "../Forms/Letter/AddStudentLetterForm";
import AddStudentSoundForm from "../Forms/Sound/AddStudentSoundForm";
class Line4 extends Component {
  addStudentWordForm(student) {
    if (!student) {
      return <div>loading...</div>;
    }
    return <AddStudentWordForm student={student} />;
  }

  addStudentLetterForm(student) {
    if (!student) {
      return <div>loading...</div>;
    }
    return <AddStudentLetterForm student={student} />;
  }
  addStudentSoundForm(student) {
    if (!student) {
      return <div>loading...</div>;
    }
    return <AddStudentSoundForm student={student} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="4">{this.addStudentWordForm(this.props.student)}</Col>
          <Col lg="4">{this.addStudentLetterForm(this.props.student)}</Col>
          <Col lg="4">{this.addStudentSoundForm(this.props.student)}</Col>
        </Row>
      </div>
    );
  }
}
export default Line4;
