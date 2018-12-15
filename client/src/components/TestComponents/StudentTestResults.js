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
class StudentTestResults extends React.Component {
  state = {
    test: null
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      let d = await axios
        .get(`http://localhost:5000/api/get-student-test/${id}`)
        .then(test => {
          this.setState({ test: test });
        });
      console.log(d);
    } catch (e) {
      console.log(e);
    }

    this.props.studentActions.fetchStudent({ id: id });
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
    let test = studentTest.data[1];
    console.log("get word counts data", test);
    return test.map(test => WordCounts(test));
  }
  render() {
    return (
      <div>
        <br />
        <div>{this.displayStudentPage(this.props.student)}</div>
        <div>{this.displayStudentLink(this.props.student)}</div>
        <div>{this.getWordCounts(this.state.test)}</div>
        <div>{this.displayChart(this.state.test)}</div>
        <div>{this.viewStudentTestResults(this.state.test)}</div>
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
    student: state.student
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentTestResults);
