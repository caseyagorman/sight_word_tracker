import React from "react";
import axios from "axios";
import StudentPage from "./StudentPage";
import StudentWordsPage from "./StudentWordsPage";
import AddStudentWordForm from "../Forms/AddStudentWordForm";
import TestStudentLink from "../StudentTest/TestStudentLink";
class StudentDetail extends React.Component {
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
    if (!student) {
      return <p>Loading student...</p>;
    }
    return StudentPage(student);
  }

  displayStudentWords(student) {
    if (!student) {
      return <p>Loading student words...</p>;
    }
    return student.data[1].map(student => StudentWordsPage(student));
  }

  getStudentTest(student) {
    if (!student) {
      return <p>Loading test...</p>;
    }
    return TestStudentLink(student);
  }

  getName(student) {
    if (!student) {
      return <p> Loading... </p>;
    }
    return student.data[0].fname;
  }

  getLastName(student) {
    if (!student) {
      return <p> Loading... </p>;
    }
    return student.data[0].lname;
  }
  render() {
    return (
      <div>
        <br />
        <div>{this.displayStudent(this.state.student)}</div>
        <br />
        <div>{this.displayStudentWords(this.state.student)}</div>
        <br />
        <div>{this.getStudentTest(this.state.student)}</div>
        <br />
        <div>
          <AddStudentWordForm
            fname={this.getName(this.state.student)}
            lname={this.getLastName(this.state.student)}
          />
        </div>
      </div>
    );
  }
}

export default StudentDetail;
