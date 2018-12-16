import React from "react";
import ViewStudentTestResults from "./ViewStudentTestResults";
import Student from "../studentComponents/StudentDetail/Student";
import StudentPage from "../studentComponents/StudentDetail/StudentPage";
import WordCounts from "./WordCounts";
import StudentDoughnutChart from "./StudentDoughnutChart";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../redux/actions/studentActions";
import * as studentTestResultsActions from "../../redux/actions/studentTestResultsActions";
class StudentTestResults extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.studentTestResultsActions.fetchStudentTestResults({ id: id });
    this.props.studentActions.fetchStudent({ id: id });
  }

  viewStudentTestResults(studentTestResults) {
    if (!studentTestResults) {
      return <p>loading...</p>;
    }
    let testResults = studentTestResults[0];
    return testResults.map(testResults => ViewStudentTestResults(testResults));
  }

  displayStudentPage(student) {
    if (!student) {
      return <p>loading...</p>;
    }
    console.log("studentPage", student);
    return StudentPage(student);
  }

  displayStudentLink(student) {
    if (!student) {
      return <p>loading...</p>;
    }
    console.log("display link", student);
    return Student(student[0]);
  }

  displayChart(studentTest) {
    if (!studentTest) {
      return <p>loading...</p>;
    }
    let test = studentTest[3];
    return <StudentDoughnutChart data={test} />;
  }

  getWordCounts(studentTest) {
    if (!studentTest) {
      return <p>loading...</p>;
    }
    let test = studentTest[1];
    return test.map(test => WordCounts(test));
  }
  render() {
    console.log("PROPS", this.props);
    return (
      <div>
        <br />
        <div>{this.displayStudentPage(this.props.student)}</div>
        <div>{this.displayStudentLink(this.props.student)}</div>
        <div>{this.getWordCounts(this.props.studentTestResults)}</div>
        <div>{this.displayChart(this.props.studentTestResults)}</div>
        <div>{this.viewStudentTestResults(this.props.studentTestResults)}</div>
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
    student: state.student
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentTestResults);
