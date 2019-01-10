import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../../../static/StudentStyle.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as studentTestActions from "../../../../redux/actions/studentTestActions";

class WordTestStudentLink extends Component {
  displayWordTestLink(student) {
    if (!student) {
      return <div>loading...</div>;
    }
    return (
      <div className="container">
        <Link to={`/test-student/${this.props.student[0].student_id}`}>
          <button
            id="test-student-button"
            onClick={() => this.props.studentTestActions.beginTest("word")}
          >
            Test {this.props.student[0].fname}'s Words
          </button>
        </Link>
      </div>
    );
  }

  render() {
    return <div>{this.displayWordTestLink(this.props.student)}</div>;
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
)(WordTestStudentLink);
