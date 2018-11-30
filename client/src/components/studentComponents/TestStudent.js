import React from "react";
import axios from "axios";
import StudentPage from "./StudentPage";
import StudentWordsPage from "./StudentWordsPage";
import AddStudentWordForm from "./AddStudentWordForm";
import TestStudentLink from "./TestStudentLink";
import { Link } from "react-router-dom";
class TestStudent extends React.Component {
  state = {
    student: null
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`http://localhost:5000/api/details/${id}`).then(student => {
      this.setState(() => ({ student }));
    });
  }

  displayStudent(student) {
    console.log(student);
    if (!student) {
      return <p>Loading student...</p>;
    }
    return StudentPage(student);
  }

  //   displayStudentWords(student) {
  //     console.log(student);
  //     if (!student) {
  //       return <p>Loading student words...</p>;
  //     }
  //     return student.data[1].map(student => StudentWordsPage(student));
  //   }

  //   getStudentTest(student) {
  //     if (!student) {
  //       return <p>Loading test...</p>;
  //     }
  //     return TestStudentLink(student);
  //   }

  render() {
    return (
      <div>
        <br />
        <div>{this.displayStudent(this.state.student)}</div>
        <br />
        {/* <div>{this.displayStudentWords(this.state.student)}</div> */}
      </div>
    );
  }
}

export default TestStudent;
