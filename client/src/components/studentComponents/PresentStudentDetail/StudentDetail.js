import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";
import * as studentWordsActions from "../../../redux/actions/studentWordsActions";
import * as studentWordTestResultsActions from "../../../redux/actions/studentWordTestResultsActions";
import * as studentLetterTestResultsActions from "../../../redux/actions/studentLetterTestResultsActions";
import Line1 from "./Line1StudentDetail";
import Line2 from "./Line2StudentDetail";
import Line3 from "./Line3StudentDetail";
import Line4 from "./Line4StudentDetail";
import Line5 from "./Line5StudentDetail";
import Line6 from "./Line6StudentDetail";
import Line7 from "./Line7StudentDetail";
import Line8 from "./Line8StudentDetail";
import Line9 from "./Line9StudentDetail";
class StudentDetail extends React.Component {
  componentDidMount() {
    console.log("student detail", this.props);
    if (!this.props.id) {
      return <div>loading...</div>;
    }
    const student = this.props.id;
    const user = this.props.token;
    this.props.studentActions.fetchStudent(student, user);
    this.props.studentWordTestResultsActions.fetchStudentWordTestResults(
      student,
      user
    );
    this.props.studentLetterTestResultsActions.fetchstudentLetterTestResults(
      student,
      user
    );
  }

  displayLine1(student, id) {
    if (!student) {
      return <div> loading..</div>;
    }

    return <Line1 student={student} id={id} />;
  }

  displayLine2(student, id) {
    if (!student) {
      return <div> loading..</div>;
    }

    return <Line2 student={student} id={id} />;
  }

  displayLine3(student) {
    if (!student) {
      return <div> loading..</div>;
    }
    return <Line3 student={student} />;
  }

  displayLine4(student) {
    if (!student) {
      return <div> loading..</div>;
    }
    return <Line4 student={student} />;
  }

  displayLine5(studentWordTestResults, studentLetterTestResults) {
    if (!studentWordTestResults && !studentLetterTestResults) {
      return <div> loading..</div>;
    }
    return (
      <Line5
        studentWordTestResults={studentWordTestResults}
        studentLetterTestResults={studentLetterTestResults}
      />
    );
  }
  displayLine6(studentWordTestResults, studentLetterTestResults) {
    if (!studentWordTestResults && !studentLetterTestResults) {
      return <div> loading..</div>;
    }
    return (
      <Line6
        studentWordTestResults={studentWordTestResults}
        studentLetterTestResults={studentLetterTestResults}
      />
    );
  }

  displayLine7(studentWordTestResults, studentLetterTestResults) {
    if (!studentWordTestResults && !studentLetterTestResults) {
      return <div> loading..</div>;
    }
    return (
      <Line7
        studentWordTestResults={studentWordTestResults}
        studentLetterTestResults={studentLetterTestResults}
      />
    );
  }

  displayLine8(studentWordTestResults, studentLetterTestResults) {
    if (!studentWordTestResults && !studentLetterTestResults) {
      return <div> loading..</div>;
    }
    return (
      <Line8
        studentWordTestResults={studentWordTestResults}
        studentLetterTestResults={studentLetterTestResults}
      />
    );
  }

  displayLine9(student) {
    if (!student) {
      return <div> loading..</div>;
    }
    return <Line9 student={student} />;
  }

  render() {
    return (
      <div>
        <div className="container">{this.displayLine1(this.props.student)}</div>
        <div className="container">{this.displayLine2(this.props.student)}</div>
        <br />
        <div className="container">{this.displayLine3(this.props.student)}</div>
        <div className="container">{this.displayLine4(this.props.student)}</div>
        <div className="container">
          {this.displayLine5(
            this.props.studentWordTestResults,
            this.props.studentLetterTestResults
          )}
        </div>
        <div className="container">
          {this.displayLine6(
            this.props.studentWordTestResults,
            this.props.studentLetterTestResults
          )}
        </div>
        <br />
        <div className="container">
          {this.displayLine7(
            this.props.studentWordTestResults,
            this.props.studentLetterTestResults
          )}
        </div>
        <div className="container">
          {this.displayLine8(
            this.props.studentWordTestResults,
            this.props.studentLetterTestResults
          )}
        </div>
        <div className="container">{this.displayLine9(this.props.student)}</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    studentActions: bindActionCreators(studentActions, dispatch),
    studentWordsActions: bindActionCreators(studentWordsActions, dispatch),
    studentWordTestResultsActions: bindActionCreators(
      studentWordTestResultsActions,
      dispatch
    ),
    studentLetterTestResultsActions: bindActionCreators(
      studentLetterTestResultsActions,
      dispatch
    )
  };
}

function mapStateToProps(state) {
  return {
    student: state.student,
    studentWords: state.studentWords,
    auth: state.auth,
    studentWordTestResults: state.studentWordTestResults,
    studentLetterTestResults: state.studentLetterTestResults
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDetail);
