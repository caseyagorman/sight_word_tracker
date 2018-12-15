import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../redux/actions/studentActions";
import PropTypes from "prop-types";
import Student from "../studentComponents/StudentDetail/Student";
import { Link } from "react-router-dom";
import ViewClassChart from "./ViewClassChart";
const divStyle = {
  display: "inline"
};
class ViewStudents extends React.Component {
  componentDidMount() {
    this.props.studentActions.fetchStudents();
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
