import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";
import StudentPage from "./StudentPage";
import StudentWordsPage from "./StudentWordsPage";
import AddStudentWordForm from "../Forms/AddStudentWordForm";
import TestStudentLink from "../StudentTest/TestStudentLink";
import DeleteStudent from "../Forms/DeleteStudent";
import StudentTestResultsLink from "../../TestComponents/StudentTestResultsLink";

class StudentDetail extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    const { user } = this.props.auth.user;
    this.props.studentActions.fetchStudent({ id: id, user: user });
  }

  displayStudent(student) {
    if (!student) {
      return <p>Loading student...</p>;
    }
    return StudentPage(student);
  }

  displayStudentWords(student) {
    if (!student) {
      return <p>Loading student words...</p>;
    }
    return student[1].map(student => StudentWordsPage(student));
  }

  getStudentTestLink(student) {
    if (!student) {
      return <p>Loading test...</p>;
    }

    return TestStudentLink(student);
  }
  getStudentTestResultsLink(student) {
    if (!student) {
      return <p>Loading test...</p>;
    }

    return StudentTestResultsLink(student);
  }

  turnIntoArray(obj) {
    if (!obj) {
      return <p>Loading...</p>;
    }
    let wordList = [];
    for (let key in obj) {
      let wordObj = obj[key];
      wordList.push(wordObj.word);
    }
    return wordList;
  }
  getWords(words) {
    if (!words) {
      return <p> Loading... </p>;
    }
    let wordList = this.turnIntoArray(words);
    return wordList;
  }

  displayAddWordForm(student) {
    if (!student) {
      return <div>loading...</div>;
    }
    return <AddStudentWordForm student={student} />;
  }

  displayDeleteStudentButton(student) {
    if (!student) {
      return <div>loading...</div>;
    }
    return <DeleteStudent student={student} />;
  }
  render() {
    return (
      <div>
        <div>{this.displayStudent(this.props.student)} </div>

        <div>{this.displayDeleteStudentButton(this.props.student)}</div>

        <div>{this.displayStudentWords(this.props.student)} </div>
        <br />
        <div>{this.getStudentTestLink(this.props.student)}</div>
        <br />
        <div>{this.getStudentTestResultsLink(this.props.student)}</div>
        <br />
        <div>{this.displayAddWordForm(this.props.student)}</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    studentActions: bindActionCreators(studentActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    student: state.student,
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDetail);
