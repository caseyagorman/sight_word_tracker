import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentsActions from "../../../redux/actions/studentsActions";
import AddStudentButton from "../Forms/StudentForms/AddStudentButton";
import ViewChartsButton from "../Forms/ViewChartsButton";
import Line1 from "./Line1AllStudents";
import "../../../static/StudentStyle.css";

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
        <br /> Click dashboard to test student, view words student is learning,
        and view student data. Click book to view student reports.
      </div>
    );
  }

  displayLine1(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <Line1 students={students} token={this.props.token} />;
  }

  displayAddStudentButton() {
    return <AddStudentButton />;
  }

  displayViewChartsButton() {
    return <ViewChartsButton />;
  }

  render() {
    return (
      <div className="container">
        <br />
        <h1 id="display-student">All Students</h1>
        <div id="instructions">{this.displayInstructions()}</div>
        <br />
        <div>
          {this.displayAddStudentButton()} {this.displayViewChartsButton()}
        </div>
        <div>
          <br />
        </div>
        <div>
          <div>{this.displayLine1(this.props.students)}</div>
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
