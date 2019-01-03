import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import AddStudentWordForm from "../Forms/AddStudentWordForm";
import AddStudentLetterForm from "../Forms/AddStudentLetterForm";
class Line3 extends Component {
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

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="2">{this.addStudentWordForm(this.props.student)}</Col>
          <Col lg="2">{this.addStudentLetterForm(this.props.student)}</Col>
        </Row>
      </div>
    );
  }
}
export default Line3;
