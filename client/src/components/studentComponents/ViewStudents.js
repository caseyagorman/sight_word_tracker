import React from "react";
import axios from "axios";
import Student from "./Student";
import { Link } from "react-router-dom";
const apiUrl = "http://localhost:5000/api/students";
const divStyle = {
  display: "inline"
};
class ViewStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = { students: null };
    axios.get(apiUrl).then(response => {
      this.setState({
        students: response.data
      });
    });
  }

  displayStudents(students) {
    if (!students) {
      return <p>Loading student...</p>;
    }
    return students.map(student => Student(student));
  }

  render() {
    return (
      <div>
        <h2>Students</h2>
        <div style={divStyle}>
          <Link to={`/add-student`}> Add Student |</Link>
        </div>

        <div style={divStyle}>
          {" "}
          <Link to={`/test-student`}> Test Student |</Link>
        </div>
        {this.displayStudents(this.state.students)}
      </div>
    );
  }
}

export default ViewStudents;
