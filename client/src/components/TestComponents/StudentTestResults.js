import React from "react";
import axios from "axios";
import ViewStudentTestResults from "./ViewStudentTestResults";
import StudentPage from "../studentComponents/StudentDetail/StudentPage";
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
    console.log(test);
    return test.map(test => ViewStudentTestResults(test));
  }

  // test.map(test => ViewStudentTestResults(test))
  //

  displayStudentName(student) {
    if (!student) {
      return <p>loading...</p>;
    }
    return StudentPage(student);
  }
  render() {
    return (
      <div>
        <div>{this.displayStudentName(this.state.student)}</div>
        <div>{this.viewStudentTestResults(this.state.test)}</div>
      </div>
    );
  }
}

export default StudentTestResults;
