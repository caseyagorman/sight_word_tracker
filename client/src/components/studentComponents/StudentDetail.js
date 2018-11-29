import React from "react";
import axios from "axios";
import StudentPage from "./StudentPage";
import StudentWordsPage from "./StudentWordsPage";
import DeleteStudent from "./DeleteStudent";
import AddStudentWordForm from "./AddStudentWordForm";
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

  render() {
    return (
      <div>
        <br />
        <div>{this.displayStudent(this.state.student)}</div>
        <br />
        <div>{this.displayStudentWords(this.state.student)}</div>
        <br />
        <div>
          <DeleteStudent />
        </div>
        <br />
        <div>
          <AddStudentWordForm />
        </div>
      </div>
    );
  }
}

export default StudentDetail;
