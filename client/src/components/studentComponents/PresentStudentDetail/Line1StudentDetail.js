import React, { Component } from "react";
// import { Row, Col } from "react-bootstrap";
import StudentNamePage from "../StudentDetail/StudentNamePage";
import DeleteStudentFormContainer from "../../../containers/DeleteStudentFormContainer";
import "../../../static/StudentStyle.css";
class Line1 extends Component {
  studentNamePage(student) {
    if (!student) {
      return <p>Loading student...</p>;
    }
    return StudentNamePage(student);
  }

  deleteStudentForm(student) {
    if (!student) {
      return <p>loading...</p>;
    }
    return <DeleteStudentFormContainer student={student[0]} />;
  }

  render() {
    return (
      <div className="container">
        <b id="student-name-header">
          {this.studentNamePage(this.props.student)}
        </b>

        <b id="student-detail-trash-can">
          {this.deleteStudentForm(this.props.student)}
        </b>
      </div>
    );
  }
}
export default Line1;
