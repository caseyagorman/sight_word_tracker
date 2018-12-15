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
    this.props.studentActions.fetchStudent({ id: id });

    // axios.get(`http://localhost:5000/api/unknown-words/${id}`).then(words => {
    //   this.setState({ words: words });
    // });
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

  getName(student) {
    if (!student) {
      return <p> Loading... </p>;
    }
    return student[0].fname;
  }

  getLastName(student) {
    if (!student) {
      return <p> Loading... </p>;
    }
    return student[0].lname;
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
    let wordList = this.turnIntoArray(words.data);
    return wordList;
  }

  render() {
    return (
      <div>
        <div>{this.displayStudent(this.props.student)} </div>
        <DeleteStudent
          fname={this.getName(this.props.student)}
          lname={this.getLastName(this.props.student)}
        />
        <div>{this.displayStudentWords(this.props.student)} </div>
        <br />
        {/* <div>{this.getStudentTestLink(this.props.student)}</div> */}
        <br />
        {/* <div>{this.getStudentTestResultsLink(this.props.student)}</div> */}
        <br />
        <div>
          <AddStudentWordForm
            fname={this.getName(this.props.student)}
            lname={this.getLastName(this.props.student)}
            words={this.getWords(this.props.words)}
          />
        </div>
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
    student: state.student
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDetail);
