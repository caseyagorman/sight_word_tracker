import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";
import * as studentTestActions from "../../../redux/actions/studentTestActions";
import TestStudentPage from "./TestStudentPage";
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
      <TestStudentPage
        user={this.props.token}
        studentTestItems={words}
        student={student}
      />
    );
  }

  getLetters(student) {
    if (!student) {
      return <p> Loading... </p>;
    }
    let letters = this.turnIntoArray(student[2]);
    return (
      <TestStudentPage
        user={this.props.token}
        studentTestItems={letters}
        student={student}
      />
    );
  }

  getSounds(student) {
    if (!student) {
      return <p> Loading... </p>;
    }
    let sounds = this.turnIntoArray(student[3]);

    return (
      <TestStudentPage
        user={this.props.token}
        studentTestItems={sounds}
        student={student}
      />
    );
  }

  turnIntoArray(obj) {
    if (!obj) {
      return <p>Loading...</p>;
    }
    let list = [];
    for (let key in obj) {
      let newObj = obj[key];
      newObj = newObj[Object.keys(newObj)[0]];
      list.push(newObj);
    }
    return list;
  }

  renderTestFunction(student) {
    if (!student) {
      return <div>loading...</div>;
    } else if (this.props.studentTest.testType === "word") {
      return <div>{this.getWords(student)}</div>;
    } else if (this.props.studentTest.testType === "letter") {
      return <div>{this.getLetters(student)}</div>;
    } else if (this.props.studentTest.testType === "sound") {
      return <div>{this.getSounds(student)}</div>;
    }
  }

  render() {
    return <div>{this.renderTestFunction(this.props.student)}</div>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    studentActions: bindActionCreators(studentActions, dispatch),
    studentTestActions: bindActionCreators(studentTestActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    student: state.student,
    studentTest: state.studentTest
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestStudent);
