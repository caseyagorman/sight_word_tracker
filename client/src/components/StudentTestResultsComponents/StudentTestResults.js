import React from "react";
import ViewStudentTestResults from "./ViewStudentTestResults";
import Student from "../StudentComponents/StudentDetail/Student";
import StudentPage from "../StudentComponents/StudentDetail/StudentPage";
import DisplayWordCounts from "./DisplayWordCounts";
import StudentDoughnutChart from "./StudentDoughnutChart";
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

  viewStudentTestResults(studentTestResults) {
    if (!studentTestResults) {
      return <p>loading...</p>;
    }
    let testResults = studentTestResults[0];

    return testResults.map(testResults => ViewStudentTestResults(testResults));
  }

  displayChart(studentTest) {
    if (!studentTest) {
      return <p>loading...</p>;
    }
    console.log("display chart", studentTest);
    let test = studentTest[3];
    return <StudentDoughnutChart data={test} />;
  }

  getWordCounts(studentTest) {
    if (!studentTest) {
      return <p>loading...</p>;
    }
    console.log("get word counts", studentTest);
    let test = studentTest[1];
    return <DisplayWordCounts test={test} />;
  }
  render() {
    return (
      <div>
        <br />
        <div>{this.getWordCounts(this.props.studentTestResults)}</div>
        <div>{this.viewStudentTestResults(this.props.studentTestResults)}</div>
        <div>{this.displayChart(this.props.studentTestResults)}</div>
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
