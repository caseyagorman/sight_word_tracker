import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";
import StudentPage from "./StudentPage";
import DisplayStudentWords from "./DisplayStudentWords";
import AddStudentWordForm from "../Forms/AddStudentWordForm";
import TestStudentLink from "../TestStudent/TestStudentLink";
import DeleteStudentFormContainer from "../../../containers/DeleteStudentFormContainer";
import StudentTestResultsContainer from "../../../containers/StudentTestResultsContainer";
import { Grid, Row, Col } from "react-bootstrap";

class StudentDetail extends React.Component {
  componentDidMount() {
    console.log("component did mount", this.props);
    console.log("id", this.props.id);

    if (!this.props.id) {
      return <div> loading...</div>;
    }
    const student = this.props.id;
    const user = this.props.token;
    console.log("student", student, "user", user);
    this.props.studentActions.fetchStudent(student, user);
  }

  StudentPage(student) {
    if (!student) {
      return <p>Loading student...</p>;
    }
    return StudentPage(student);
  }

  StudentWords(student) {
    console.log("StudentWords", student[1]);
    if (!student) {
      return <p>Loading student words...</p>;
    }
    return <DisplayStudentWords student={student[0]} words={student[1]} />;
  }

  TestStudentLink(student) {
    if (!student) {
      return <p>Loading test...</p>;
    }
    return TestStudentLink(student);
  }

  AddStudentWordForm(student) {
    if (!student) {
      return <div>loading...</div>;
    }
    return <AddStudentWordForm student={student} />;
  }

  DeleteStudentButton(studentId) {
    if (!studentId) {
      return <div>loading...</div>;
    }
    return <DeleteStudentFormContainer studentId={studentId} />;
  }
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          {this.StudentPage(this.props.student)}

          {this.DeleteStudentButton(this.props.id)}
        </Row>
        <div>{this.TestStudentLink(this.props.student)}</div>
        <div>{this.StudentWords(this.props.student)} </div>
        <div>{this.AddStudentWordForm(this.props.student)}</div>
        {/* <StudentTestResultsContainer id={this.props.id} /> */}
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    studentActions: bindActionCreators(studentActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    student: state.student,
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDetail);
