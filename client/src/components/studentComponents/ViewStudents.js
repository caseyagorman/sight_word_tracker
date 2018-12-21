import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentsActions from "../../redux/actions/studentsActions";
import Student from "../studentComponents/StudentDetail/Student";
import { Link } from "react-router-dom";
import ViewClassChart from "./ViewClassChart";
const divStyle = {
  display: "inline"
};
class ViewStudents extends React.Component {
  componentDidMount() {
    this.props.studentsActions.fetchStudents();
  }

  displayStudents(students) {
    if (!students) {
      return <p>Loading student...</p>;
    }
    console.log("student props", this.props);
    return students.map(student => Student(student));
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
        <div>{this.displayStudents(this.props.students)}</div>
        <div>
          <ViewClassChart />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    students: state.students
  };
}

function mapDispatchToProps(dispatch) {
  return {
    studentsActions: bindActionCreators(studentsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewStudents);
