import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentsActions from "../../../redux/actions/studentsActions";
import StudentLink from "./StudentLink";
import AddStudentButton from "../Forms/AddStudentButton";
import DoughnutChart from "./DoughnutChart";
const headerStyle = {
  fontSize: "100px"
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
    return students.map(student => StudentLink(student));
  }

  displayChart(user) {
    if (!user) {
      return <p>Loading...</p>;
    }
    return <DoughnutChart user={user} />;
  }
  displayAddStudentButton() {
    return <AddStudentButton />;
  }

  render() {
    return (
      <div class="container">
        <br />
        <h1 style={headerStyle}>All Students</h1>
        <div>{this.displayAddStudentButton()}</div>
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
