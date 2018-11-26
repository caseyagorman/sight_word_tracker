import React from "react";
import axios from "axios";
import StudentDetailPage from "./StudentDetailPage";
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
    return StudentDetailPage(student);
  }

  render() {
    return <div>{this.displayStudent(this.state.student)}</div>;
  }
}

export default StudentDetail;
