import React from "react";
import axios from "axios";
import StudentPage from "./StudentPage";
import StudentWordsPage from "./StudentWordsPage";
import AddStudentWordForm from "../Forms/AddStudentWordForm";
import TestStudentLink from "../StudentTest/TestStudentLink";
import DeleteStudent from "../Forms/DeleteStudent";
import StudentTestResultsLink from "../../TestComponents/StudentTestResultsLink";
import Chart from "../../TestComponents/Chart";
class StudentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: null,
      words: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`http://localhost:5000/api/details/${id}`).then(student => {
      this.setState({ student: student });
    });
    axios.get(`http://localhost:5000/api/unknown-words/${id}`).then(words => {
      this.setState({ words: words });
    });
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
    return student.data[1].map(student => StudentWordsPage(student));
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
    return student.data[0].fname;
  }

  getLastName(student) {
    if (!student) {
      return <p> Loading... </p>;
    }
    return student.data[0].lname;
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
        <br />
        <div>
          {this.displayStudent(this.state.student)}
          <DeleteStudent
            fname={this.getName(this.state.student)}
            lname={this.getLastName(this.state.student)}
          />
        </div>
        <br />
        <div>{this.displayStudentWords(this.state.student)} </div>
        <br />
        <div>{this.getStudentTestLink(this.state.student)}</div>
        <br />
        <div>{this.getStudentTestResultsLink(this.state.student)}</div>
        <br />
        <div>
          <AddStudentWordForm
            fname={this.getName(this.state.student)}
            lname={this.getLastName(this.state.student)}
            words={this.getWords(this.state.words)}
          />
        </div>
      </div>
    );
  }
}

export default StudentDetail;
