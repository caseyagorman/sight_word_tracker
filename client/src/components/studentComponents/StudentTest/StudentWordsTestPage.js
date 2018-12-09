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
      // create a new test object
      console.log(this.state.unknown_words, this.state.known_words);
      console.log("test complete!");
      return this.props.history.push("/students");
    }

    return <div>{words}</div>;
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
