import React from "react";
import axios from "axios";
import StudentPage from "./StudentPage";
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
    console.log("displayStudent", student.data[0]);
  }

  displayStudentWords(student) {
    console.log("displayStudentWords", student.data[1]);
  }

  render() {
    return (
      <div>
        <div>{this.displayStudent(this.state.student)}</div>
        <div>{this.displayStudentWords(this.state.student)}</div>
      </div>
    );
  }
}

export default StudentDetail;
