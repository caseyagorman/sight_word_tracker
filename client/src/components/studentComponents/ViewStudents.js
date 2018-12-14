import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../redux/actions/studentActions";
import PropTypes from "prop-types";
import axios from "axios";
import Student from "../studentComponents/StudentDetail/Student";
import { Link } from "react-router-dom";
import StudentDoughnutChart from "./StudentDoughnutChart";
const studentWordApiUrl = "http://localhost:5000/api/get-learned-words";
const divStyle = {
  display: "inline"
};
class ViewStudents extends React.Component {
  async componentDidMount() {
    console.log(this.props);
    this.props.studentActions.fetchStudents();

    // try {
    //   let f = await axios.get(studentWordApiUrl).then(response => {
    //     this.setState({ studentWords: response.data });
    //     console.log(response.data);
    //   });
    //   console.log(f);
    // } catch (e) {
    //   console.log(e);
    // }
  }

  displayStudents(students) {
    if (!students) {
      return <p>Loading student...</p>;
    }
    console.log(students);
    return students.map(student => Student(student));
  }

  // displayChart(studentWords) {
  //   if (!studentWords) {
  //     return <p> loading...</p>;
  //   }
  //   return <StudentDoughnutChart dataResults={studentWords} />;
  // }

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
        <div>{this.displayStudents(this.props.students)}</div>
        {/* <div>{this.displayChart(this.state.studentWords)}</div> */}
      </div>
    );
  }
}

ViewStudents.propTypes = {
  studentActions: PropTypes.object,
  students: PropTypes.object
};

function mapStateToProps(state) {
  return {
    students: state.students
  };
}

function mapDispatchToProps(dispatch) {
  return {
    studentActions: bindActionCreators(studentActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewStudents);
