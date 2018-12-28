import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";
import TestStudentLink from "../TestStudent/TestStudentLink";
import StudentTestResultsContainer from "../../../containers/StudentTestResultsContainer";
import DeleteStudentFormContainer from "../../../containers/DeleteStudentFormContainer";
import Line1 from "./Line1";
import Line2 from "./Line2";

class StudentDetail extends React.Component {
  componentDidMount() {
    if (!this.props.id) {
      return <div>loading...</div>;
    }
    const student = this.props.id;
    const user = this.props.token;
    this.props.studentActions.fetchStudent(student, user);
  }

  displayLine1(student, id) {
    if (!student) {
      return <div> loading..</div>;
    }
    return <Line1 student={student} id={id} />;
  }

  displayLine2(student) {
    if (!student) {
      return <div> loading..</div>;
    }
    return <Line2 student={student} />;
  }
  deleteStudentButton(student, studentId) {
    if (!studentId) {
      return <div>loading...</div>;
    }
    return (
      <DeleteStudentFormContainer studentId={studentId} student={student} />
    );
  }

  TestStudentLink(student) {
    if (!student) {
      return <p>Loading test...</p>;
    }
    return TestStudentLink(student);
  }

  render() {
    return (
      <div>
        {this.displayLine1(this.props.student)}
        <div>{this.TestStudentLink(this.props.student)}</div>
        <br />
        {this.displayLine2(this.props.student)}
        <div>
          <StudentTestResultsContainer
            id={this.props.id}
            token={this.props.token}
            username={this.props.username}
          />
        </div>
        {this.deleteStudentButton(this.props.student, this.props.id)}
      </div>
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
