import React from "react";
import axios from "axios";
import StudentPage from "./StudentPage";
import StudentWordsPage from "./StudentWordsPage";
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

  // addStudentWord(student, event) {
  //   event.preventDefault();
  //   let newStudentWord = {
  //     fname: student.data[0].fname,
  //     lname: student.data[0].lname,
  //     word: this.wordInput.value
  //   };

  //   newStudentWord = JSON.stringify(newStudentWord);
  //   console.log(newStudentWord);
  //   const config = {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   };
  //   axios
  //     .post(
  //       "http://localhost:5000/api/add-word-to-student",
  //       newStudentWord,
  //       config
  //     )
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

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
