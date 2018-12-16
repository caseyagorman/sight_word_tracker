import React from "react";
import axios from "axios";
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
    this.props.studentTestResultsActions.fetchStudentTest({ id: id });
    console.log("STUDENT TEST RESULT", this.props);
  }

  viewStudentTestResults(studentTest) {
    if (!studentTest) {
      return <p>loading...</p>;
    }
    let test = studentTest.data[0];
    return test.map(test => ViewStudentTestResults(test));
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
    let test = studentTest.data[3];
    return <StudentDoughnutChart data={test} />;
  }

  getWordCounts(studentTest) {
    if (!studentTest) {
      return <p>loading...</p>;
    }
    console.log("studentTest", studentTest);
    let test = studentTest.data[1];
    console.log("get word counts data", test);
    return test.map(test => WordCounts(test));
  }
  render() {
    console.log("PROPS", this.props);
    return (
      <div>
        <br />
        <div>{this.displayStudentPage(this.props.student)}</div>
        <div>{this.displayStudentLink(this.props.student)}</div>
        <div>{this.getWordCounts(this.props.test)}</div>
        <div>{this.displayChart(this.props.test)}</div>
        <div>{this.viewStudentTestResults(this.props.test)}</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    studentActions: bindActionCreators(studentActions, dispatch),
    studentTestResultsActions: bindActionCreators(
      studentTestResultsActions,
      dispatch
    )
  };
}

function mapStateToProps(state) {
  return {
    student: state.student,
    studentTestResults: state.studentTestResults
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentTestResults);
