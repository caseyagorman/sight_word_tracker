import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import AddStudentWordForm from "../Forms/AddStudentWordForm";
import StudentWordsTableHead from "./StudentWordsTableHead";
import StudentNamePage from "./StudentNamePage";
const divStyle = {
  display: "inline"
};

class Line2 extends Component {
  studentWordsTableHead(student) {
    if (!student) {
      return <p>Loading student words...</p>;
    }
    return <StudentWordsTableHead student={student[0]} words={student[1]} />;
  }

  addStudentWordForm(student) {
    if (!student) {
      return <div>loading...</div>;
    }
    return <AddStudentWordForm student={student} />;
  }

  render() {
    return (
      <div className="container">
        <div className="align-baseline">
          <Row>
            <Col lg="6">{this.studentWordsTableHead(this.props.student)}</Col>
            <Col lg="6">{this.addStudentWordForm(this.props.student)}</Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Line2;
