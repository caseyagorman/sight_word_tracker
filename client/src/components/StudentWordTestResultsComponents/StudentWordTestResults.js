import React from "react";
import Line3 from "./Line3StudentDetail";
import Line4 from "./Line4StudentDetail";
import Line5 from "./Line5StudentDetail";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../redux/actions/studentActions";
import * as studentWordTestResultsActions from "../../redux/actions/studentWordTestResultsActions";
class StudentWordTestResults extends React.Component {
  componentDidMount() {
    const user = this.props.token;
    const id = this.props.id;
    this.props.studentWordTestResultsActions.fetchStudentWordTestResults(
      id,
      user
    );
    this.props.studentActions.fetchStudent(id, user);
  }
  displayLine3(studentWordTestResults) {
    if (!studentWordTestResults) {
      return <div> loading..</div>;
    }
    return <Line3 studentWordTestResults={studentWordTestResults} />;
  }
  displayLine4(studentWordTestResults) {
    if (!studentWordTestResults) {
      return <div> loading..</div>;
    }
    return <Line4 studentWordTestResults={studentWordTestResults} />;
  }
  displayLine5(student) {
    if (!student) {
      return <div> loading..</div>;
    }
    return <Line5 student={student} />;
  }
  render() {
    return (
      <div>
        <br />
        <div className="container">
          {this.displayLine4(this.props.studentWordTestResults)}
        </div>
        <div className="container">
          {this.displayLine3(this.props.studentWordTestResults)}
        </div>
        <div className="container">{this.displayLine5(this.props.student)}</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    studentWordTestResultsActions: bindActionCreators(
      studentWordTestResultsActions,
      dispatch
    ),
    studentActions: bindActionCreators(studentActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    studentWordTestResults: state.studentWordTestResults,
    student: state.student,
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentWordTestResults);
