import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";
import StudentSoundsTestPage from "./StudentSoundsTestPage";
class SoundTestStudent extends React.Component {
  componentDidMount() {
    const id = this.props.id;
    const user = this.props.token;
    this.props.studentActions.fetchStudent(id, user);
  }

  getSounds(student) {
    console.log(student);
    if (!student) {
      return <p> Loading... </p>;
    }
    let sounds = this.turnIntoArray(student[3]);
    return (
      <StudentSoundsTestPage
        user={this.props.token}
        sounds={sounds}
        student={student}
      />
    );
  }

  turnIntoArray(obj) {
    if (!obj) {
      return <p>Loading...</p>;
    }
    let soundList = [];
    for (let key in obj) {
      let soundObj = obj[key];
      soundList.push(soundObj.sound);
    }
    return soundList;
  }

  render() {
    return <div>{this.getSounds(this.props.student)}</div>;
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
)(SoundTestStudent);
