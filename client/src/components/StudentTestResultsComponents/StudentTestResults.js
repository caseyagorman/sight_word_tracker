import React from "react";
import StudentTestResultsTable from "./StudentTestResultsTable";
import StudentWordCountsTableHead from "./StudentWordCountsTableHead";
import StudentDoughnutChart from "./StudentDoughnutChart";
import Line3 from "./Line3";
import Line4 from "./Line4";
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
  render() {
    return (
      <div>
        <br />
        <div>{this.displayLine3(this.props.studentTestResults)}</div>
        <div>{this.displayLine4(this.props.studentTestResults)}</div>
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
