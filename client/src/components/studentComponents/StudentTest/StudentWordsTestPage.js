import React from "react";
import axios from "axios";
import { withRouter } from "react-router";

class StudentWordsTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: this.props.words,
      idx: 0,
      known_words: [],
      unknown_words: []
    };
  }

  displayWord(words) {
    if (!words) {
      console.log("create test");
      this.createTestObject();
      // console.log(this.state.unknown_words, this.state.known_words);
      // console.log("test complete!");
      // return this.props.history.push("/students");
    }

    return <div>{words}</div>;
  }
  async createTestObject() {
    let results = {
      student_id: this.props.student,
      correct_words: this.state.known_words,
      incorrect_words: this.state.unknown_words
    };
    console.log("results", results);
    results = JSON.stringify(results);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    try {
      let d = await axios.post(
        "http://localhost:5000/api/create-student-test",
        results,
        config
      );
      this.props.history.push("/students");
      console.log(d);
    } catch (e) {
      console.log(e);
    }
  }
  incrementIdx(idx) {
    let new_idx = idx + 1;
    this.setState({ idx: new_idx });
  }

  handleTestClick(e, word, idx) {
    e.preventDefault();
    this.incrementIdx(idx);
    if (e.target.value === "yes") {
      this.setState({ known_words: this.state.known_words.concat([word]) });
    } else if (e.target.value === "no") {
      this.setState({ unknown_words: this.state.unknown_words.concat([word]) });
    }
  }

  render() {
    const words = this.state.words;
    // console.log(words);
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
