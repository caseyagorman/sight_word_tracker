import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";
import StudentWordsTestPage from "./StudentWordsTestPage";
class TestStudent extends React.Component {
  componentDidMount() {
    const id = this.props.id;
    const user = this.props.token;
    this.props.studentActions.fetchStudent(id, user);
  }

  getWords(student) {
    if (!student) {
      return <p> Loading... </p>;
    }
    let words = this.turnIntoArray(student[1]);
    return (
      <StudentWordsTestPage
        user={this.props.token}
        words={words}
        student={student[0].student_id}
      />
    );
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

  render() {
    return <div>{this.getWords(this.props.student)}</div>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    studentActions: bindActionCreators(studentActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    student: state.student
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestStudent);
