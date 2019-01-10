import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../../../static/LetterStyle.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as studentTestActions from "../../../../redux/actions/studentTestActions";

class LetterTestStudentLink extends Component {
  displayLetterTestLink(student) {
    if (!student) {
      return <div>loading...</div>;
    }
    return (
      <div className="container">
        <Link to={`/test-student/${this.props.student[0].student_id}`}>
          <button
            id="test-student-button"
            onClick={() => this.props.studentTestActions.beginTest("letter")}
          >
            Test {this.props.student[0].fname}'s Letters
          </button>
        </Link>
      </div>
    );
  }

  render() {
    return <div>{this.displayLetterTestLink(this.props.student)}</div>;
  }
}

function mapStateToProps(state) {
  return {
    studentTest: state.studentTest
  };
}

function mapDispatchToProps(dispatch) {
  return {
    studentTestActions: bindActionCreators(studentTestActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LetterTestStudentLink);
