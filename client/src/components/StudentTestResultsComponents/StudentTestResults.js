import React from "react";
import Line3 from "./Line3";
import Line4 from "./Line4";
import Line5 from "./Line5";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../redux/actions/studentActions";
import * as studentTestResultsActions from "../../redux/actions/studentTestResultsActions";
class StudentTestResults extends React.Component {
  componentDidMount() {
    const user = this.props.token;
    const id = this.props.id;
    this.props.studentTestResultsActions.fetchStudentTestResults(id, user);
    this.props.studentActions.fetchStudent(id, user);
  }
  displayLine3(studentTestResults) {
    if (!studentTestResults) {
      return <div> loading..</div>;
    }
    return <Line3 studentTestResults={studentTestResults} />;
  }
  displayLine4(studentTestResults) {
    if (!studentTestResults) {
      return <div> loading..</div>;
    }
    return <Line4 studentTestResults={studentTestResults} />;
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
        <div>{this.displayLine3(this.props.studentTestResults)}</div>
        <div>{this.displayLine4(this.props.studentTestResults)}</div>
        <div>{this.displayLine5(this.props.student)}</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    studentTestResultsActions: bindActionCreators(
      studentTestResultsActions,
      dispatch
    ),
    studentActions: bindActionCreators(studentActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    studentTestResults: state.studentTestResults,
    student: state.student,
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentTestResults);
