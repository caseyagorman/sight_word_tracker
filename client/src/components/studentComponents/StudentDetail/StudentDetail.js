import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";
import * as studentWordsActions from "../../../redux/actions/studentWordsActions";
import WordTestStudentLink from "../WordTestStudent/WordTestStudentLink";
import StudentWordTestResultsContainer from "../../../containers/StudentWordTestResultsContainer";
import Line1 from "./Line1StudentDetail";
import Line2 from "./Line2StudentDetail";

class StudentDetail extends React.Component {
  componentDidMount() {
    if (!this.props.id) {
      return <div>loading...</div>;
    }
    const student = this.props.id;
    const user = this.props.token;
    this.props.studentActions.fetchStudent(student, user);
    // this.props.studentWordsActions.fetchStudentWords(student, user);
  }

  displayLine1(student, id) {
    if (!student) {
      return <div> loading..</div>;
    }
    return <Line1 student={student} id={id} />;
  }

  displayLine2(student) {
    if (!student) {
      return <div> loading..</div>;
    }
    return <Line2 student={student} />;
  }

  WordTestStudentLink(student) {
    if (!student) {
      return <p>Loading test...</p>;
    }
    return WordTestStudentLink(student);
  }

  render() {
    return (
      <div>
        <div className="container">{this.displayLine1(this.props.student)}</div>
        <div className="container">
          {this.WordTestStudentLink(this.props.student)}{" "}
        </div>
        <div className="container">{this.displayLine2(this.props.student)}</div>
        <div className="container">
          <StudentWordTestResultsContainer
            id={this.props.id}
            token={this.props.token}
            username={this.props.username}
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    studentActions: bindActionCreators(studentActions, dispatch),
    studentWordsActions: bindActionCreators(studentWordsActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    student: state.student,
    studentWords: state.studentWords,
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDetail);
