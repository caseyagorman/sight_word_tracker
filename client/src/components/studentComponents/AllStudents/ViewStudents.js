import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentsActions from "../../../redux/actions/studentsActions";
import AddStudentButton from "../Forms/Student/AddStudentButton";
import Line1 from "./Line1AllStudents";
import Line2 from "./Line2AllStudents";
import "../../../static/StudentStyle.css";
const headerStyle = {
  fontSize: "100px"
};
const instructionsStyle = {
  fontSize: "20px",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#d3d3d3"
};
class ViewStudents extends React.Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    } else if (this.props.auth.isAuthenticated) {
      const user = this.props.token;
      this.props.studentsActions.fetchStudents(user);
    }
  }

  displayInstructions() {
    return (
      <div>
        <br /> Click student name to test student, view words student is
        learning, and view student data.
      </div>
    );
  }

  displayLine1(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <Line1 students={students} />;
  }
  displayLine2(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <Line2 students={students} />;
  }

  displayAddStudentButton() {
    return <AddStudentButton />;
  }

  render() {
    return (
      <div className="container">
        <br />
        <h1 id="display-student">All Students</h1>
        <div style={instructionsStyle}>{this.displayInstructions()}</div>
        <br />
        <div>{this.displayAddStudentButton()}</div>
        <div>
          <br />
        </div>
        <div>
          <div>{this.displayLine1(this.props.students)}</div>
          <div>{this.displayLine2(this.props.students)}</div>
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
