import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";
import StudentLetterTestPage from "./StudentLetterTestPage";
class LetterTestStudent extends React.Component {
  componentDidMount() {
    const id = this.props.id;
    const user = this.props.token;
    this.props.studentActions.fetchStudent(id, user);
  }

  getLetters(student) {
    console.log(student);
    if (!student) {
      return <p> Loading... </p>;
    }
    let letters = this.turnIntoArray(student[2]);
    console.log("letter", letters);
    return (
      <StudentLetterTestPage
        user={this.props.token}
        letters={letters}
        student={student}
      />
    );
  }

  turnIntoArray(obj) {
    if (!obj) {
      return <p>Loading...</p>;
    }
    let letterList = [];
    for (let key in obj) {
      let letterObj = obj[key];
      letterList.push(letterObj.letter);
    }
    return letterList;
  }

  render() {
    return <div>{this.getLetters(this.props.student)}</div>;
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
)(LetterTestStudent);
