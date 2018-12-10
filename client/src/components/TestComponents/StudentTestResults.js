import React from "react";
import axios from "axios";
import ViewStudentTestResults from "./ViewStudentTestResults";
import Student from "../studentComponents/StudentDetail/Student";
import WordCounts from "./WordCounts";
class StudentTestResults extends React.Component {
  state = {
    test: null,
    student: null
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    try {
      let d = await axios
        .get(`http://localhost:5000/api/get-student-test/${id}`)
        .then(test => {
          this.setState({ test: test });
        });
      console.log(f);
      let f = await axios
        .get(`http://localhost:5000/api/details/${id}`)
        .then(student => {
          this.setState({ student: student });
        });
      console.log(d);
    } catch (e) {
      console.log(e);
    }
  }

  viewStudentTestResults(studentTest) {
    if (!studentTest) {
      return <p>loading...</p>;
    }
    let test = studentTest.data;
    return test.map(test => ViewStudentTestResults(test));
  }

  displayStudentLink(student) {
    if (!student) {
      return <p>loading...</p>;
    }
    return Student(student.data[0]);
  }

  getWordCounts(student) {
    if (!student) {
      return <p>loading...</p>;
    }
    console.log("word counts", student);
    return WordCounts(student);
  }
  render() {
    return (
      <div>
        <br />
        <div>{this.displayStudentLink(this.state.student)}</div>
        <div>{this.getWordCounts(this.state.student)}</div>
        <div>{this.viewStudentTestResults(this.state.test)}</div>
      </div>
    );
  }
}

export default StudentTestResults;
