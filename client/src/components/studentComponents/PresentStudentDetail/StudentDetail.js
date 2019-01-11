import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";
import * as studentWordTestResultsActions from "../../../redux/actions/studentWordTestResultsActions";
import * as studentLetterTestResultsActions from "../../../redux/actions/studentLetterTestResultsActions";
import * as studentSoundTestResultsActions from "../../../redux/actions/studentSoundTestResultsActions";
import Line1 from "./Line1StudentDetail";
import Line2 from "./Line2StudentDetail";
import Line3 from "./Line3StudentDetail";
import Line4 from "./Line4StudentDetail";
import Line5 from "./Line5StudentDetail";
import Line6 from "./Line6StudentDetail";
import Line7 from "./Line7StudentDetail";
import Line8 from "./Line8StudentDetail";
import Line9 from "./Line9StudentDetail";
import Line10 from "./Line10StudentDetail";
class StudentDetail extends React.Component {
  componentDidMount() {
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
    this.props.studentSoundTestResultsActions.fetchstudentSoundTestResults(
      student,
      user
    );
  }

  displayLine1(student) {
    if (!student) {
      return <div> loading..</div>;
    }

    return <Line1 student={student} />;
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

  displayLine5(
    studentWordTestResults,
    studentLetterTestResults,
    studentSoundTestResults
  ) {
    if (
      !studentWordTestResults &&
      !studentLetterTestResults &&
      !studentSoundTestResults
    ) {
      return <div> loading..</div>;
    }
    return (
      <Line5
        studentWordTestResults={studentWordTestResults}
        studentLetterTestResults={studentLetterTestResults}
        studentSoundTestResults={studentSoundTestResults}
      />
    );
  }

  displayLine6(
    studentWordTestResults,
    studentLetterTestResults,
    studentSoundTestResults
  ) {
    if (
      !studentWordTestResults &&
      !studentLetterTestResults &&
      !studentSoundTestResults
    ) {
      return <div> loading..</div>;
    }
    return (
      <Line6
        studentWordTestResults={studentWordTestResults}
        studentLetterTestResults={studentLetterTestResults}
        studentSoundTestResults={studentSoundTestResults}
      />
    );
  }

  displayLine7(
    studentWordTestResults,
    studentLetterTestResults,
    studentSoundTestResults
  ) {
    if (
      !studentWordTestResults &&
      !studentLetterTestResults &&
      !studentSoundTestResults
    ) {
      return <div> loading..</div>;
    }
    return (
      <Line7
        studentWordTestResults={studentWordTestResults}
        studentLetterTestResults={studentLetterTestResults}
        studentSoundTestResults={studentSoundTestResults}
      />
    );
  }

  displayLine8(
    studentWordTestResults,
    studentLetterTestResults,
    studentSoundTestResults
  ) {
    if (
      !studentWordTestResults &&
      !studentLetterTestResults &&
      !studentSoundTestResults
    ) {
      return <div> loading..</div>;
    }
    return (
      <Line8
        studentWordTestResults={studentWordTestResults}
        studentLetterTestResults={studentLetterTestResults}
        studentSoundTestResults={studentSoundTestResults}
      />
    );
  }

  displayLine9(
    studentWordTestResults,
    studentLetterTestResults,
    studentSoundTestResults
  ) {
    if (
      !studentWordTestResults &&
      !studentLetterTestResults &&
      !studentSoundTestResults
    ) {
      return <div> loading..</div>;
    }
    return (
      <Line9
        studentWordTestResults={studentWordTestResults}
        studentLetterTestResults={studentLetterTestResults}
        studentSoundTestResults={studentSoundTestResults}
      />
    );
  }

  render() {
    return (
      <div>
        <b>{this.displayLine1(this.props.student)}</b>
        <div className="container">{this.displayLine2(this.props.student)}</div>
        <br />
        <div className="container">
          <Line10 />
        </div>
        <div className="container">{this.displayLine3(this.props.student)}</div>
        <div className="container">{this.displayLine4(this.props.student)}</div>
        <div className="container">
          {this.displayLine5(
            this.props.studentWordTestResults,
            this.props.studentLetterTestResults,
            this.props.studentSoundTestResults
          )}
        </div>
        <div className="container">
          {this.displayLine6(
            this.props.studentWordTestResults,
            this.props.studentLetterTestResults,
            this.props.studentSoundTestResults
          )}
        </div>
        <div className="container">
          {this.displayLine7(
            this.props.studentWordTestResults,
            this.props.studentLetterTestResults,
            this.props.studentSoundTestResults
          )}
        </div>
        <br />
        <div className="container">
          {this.displayLine8(
            this.props.studentWordTestResults,
            this.props.studentLetterTestResults,
            this.props.studentSoundTestResults
          )}
        </div>
        <div className="container">
          {this.displayLine9(
            this.props.studentWordTestResults,
            this.props.studentLetterTestResults,
            this.props.studentSoundTestResults
          )}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    studentActions: bindActionCreators(studentActions, dispatch),
    studentWordTestResultsActions: bindActionCreators(
      studentWordTestResultsActions,
      dispatch
    ),
    studentLetterTestResultsActions: bindActionCreators(
      studentLetterTestResultsActions,
      dispatch
    ),
    studentSoundTestResultsActions: bindActionCreators(
      studentSoundTestResultsActions,
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
    studentLetterTestResults: state.studentLetterTestResults,
    studentSoundTestResults: state.studentSoundTestResults
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDetail);
