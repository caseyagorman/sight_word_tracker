import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentsActions from "../../redux/actions/studentsActions";
import Student from "./Student";
import { Link } from "react-router-dom";
import DoughnutChart from "./DoughnutChart";
const divStyle = {
  display: "inline"
};
class ViewStudents extends React.Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      const user = this.props.token;
      this.props.studentsActions.fetchStudents(user);
    }
  }
  displayStudents(students) {
    if (!students) {
      return <p>Loading student...</p>;
    }
    return students.map(student => Student(student));
  }

  displayChart(user) {
    if (!user) {
      return <p>Loading...</p>;
    }
    return <DoughnutChart user={user} />;
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
          <div>{this.displayChart(this.props.token)}</div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    students: state.students,
    auth: state.auth
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
