import React from "react";
import axios from "axios";
import Student from "../studentComponents/StudentDetail/Student";
import { Link } from "react-router-dom";
import StudentDoughnutChart from "./StudentDoughnutChart";
const studentApiUrl = "http://localhost:5000/api/students";
const studentWordApiUrl = "http://localhost:5000/api/get-learned-words";
const divStyle = {
  display: "inline"
};
class ViewStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = { students: null, studentWords: null };
  }

  async componentDidMount() {
    try {
      let d = await axios.get(studentApiUrl).then(response => {
        this.setState({ students: response.data });
      });
      console.log(d);
    } catch (e) {
      console.log(e);
    }
    try {
      let f = await axios.get(studentWordApiUrl).then(response => {
        this.setState({ studentWords: response.data });
        console.log(response.data);
      });
      console.log(f);
    } catch (e) {
      console.log(e);
    }
  }

  displayStudents(students) {
    if (!students) {
      return <p>Loading student...</p>;
    }
    console.log(students);
    return students.map(student => Student(student));
  }

  displayChart(studentWords) {
    if (!studentWords) {
      return <p> loading...</p>;
    }
    return <StudentDoughnutChart dataResults={studentWords} />;
  }

  render() {
    return (
      <div>
        <br />
        <h1>Students</h1>
        <div style={divStyle}>
          <Link to={`/add-student`}> Add Student</Link>
        </div>
        <div>
          <br />
        </div>
        <div>{this.displayStudents(this.state.students)}</div>
        <div>{this.displayChart(this.state.studentWords)}</div>
      </div>
    );
  }
}

export default ViewStudents;
