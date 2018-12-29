import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";
import TestStudentLink from "../TestStudent/TestStudentLink";
import StudentTestResultsContainer from "../../../containers/StudentTestResultsContainer";
import DeleteStudentFormContainer from "../../../containers/DeleteStudentFormContainer";
import Line1 from "./Line1";
import Line2 from "./Line2";
import Line5 from "../../StudentTestResultsComponents/Line5";

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

  displayLine5(student, studentId) {
    if (!student) {
      return <div> loading..</div>;
    }
    return <Line5 student={student} studentId={studentId} />;
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
        <div className="container">{this.displayLine1(this.props.student)}</div>
        <div className="container">
          {this.TestStudentLink(this.props.student)}{" "}
        </div>
        <div className="container">{this.displayLine2(this.props.student)}</div>
        <div className="container">
          <StudentTestResultsContainer
            id={this.props.id}
            token={this.props.token}
            username={this.props.username}
          />
        </div>
        {/* <div className="container">
          {this.displayLine5(this.props.student, this.props.id)}
        </div> */}
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
