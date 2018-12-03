import React from "react";
import axios from "axios";
import StudentWordsTestPage from "./StudentWordsTestPage";
class TestStudent extends React.Component {
  state = {
    student: null
  };

  componentDidMount() {
    console.log("mount!");
    const { id } = this.props.match.params;

    axios.get(`http://localhost:5000/api/details/${id}`).then(student => {
      this.setState(() => ({ student }));
    });
  }
  getWords(student) {
    if (!student) {
      return <p> Loading... </p>;
    }
    let words = this.turnIntoArray(student.data[1]);
    console.log("the", words);
    return (
      <StudentWordsTestPage
        words={words}
        student={student.data[0].student_id}
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
    return <div>{this.getWords(this.state.student)}</div>;
  }
}

export default TestStudent;
