import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import DeleteStudentFormContainer from "../../../containers/DeleteStudentFormContainer";

class Line10 extends Component {
  deleteStudentForm(student) {
    console.log("student delete", student);
    if (!student) {
      return <p>loading...</p>;
    }
    return <DeleteStudentFormContainer student={student[0]} />;
  }

  render() {
    return (
      <div className="container" id="student-detail">
        <Row>
          <Col lg="6">{this.deleteStudentForm(this.props.student)}</Col>
        </Row>
      </div>
    );
  }
}
export default Line10;
