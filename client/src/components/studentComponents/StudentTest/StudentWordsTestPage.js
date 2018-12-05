import React from "react";
import axios from "axios";
import { withRouter } from "react-router";

class StudentWordsTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: this.props.words, idx: 0 };
  }

  displayWord(words) {
    if (!words) {
      this.props.history.push("/students");
    }
    return <div>{words}</div>;
  }

  incrementIdx(idx) {
    let new_idx = idx + 1;
    this.setState({ idx: new_idx });
  }

  async handleTestClick(e, word, idx) {
    e.preventDefault();
    this.incrementIdx(idx);
    if (e.target.value === "yes") {
      let wordToDelete = {
        student: this.props.student,
        word: word
      };
      try {
        let d = await axios.post(
          "http://localhost:5000/api/delete-student-word",
          wordToDelete
        );
        console.log(d);
      } catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    const words = this.state.words;
    const idx = this.state.idx;
    return (
      <div>
        <div>{this.displayWord(words[idx])}</div>
        <button
          onClick={e => this.handleTestClick(e, words[idx], idx)}
          value="yes"
        >
          Yes
        </button>
        <button
          onClick={e => this.handleTestClick(e, words[idx], idx)}
          value="no"
        >
          No
        </button>
      </div>
    );
  }
}

const StudentWordsTestPageWrapped = withRouter(StudentWordsTestPage);
export default StudentWordsTestPageWrapped;
