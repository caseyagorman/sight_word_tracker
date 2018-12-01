import React from "react";

class StudentWordsTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: this.props.words, idx: 0 };
    console.log(props);
  }

  displayWord(words) {
    if (!words) {
      return <div>Test Complete!</div>;
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
    console.log(word, e.target.value);
  }
  // const config = {
  //   headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   };
  //   axios
  //     .post(
  //       "http://localhost:5000/api/add-word-to-student",
  //       newStudentWord,
  //       config
  //     )
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   }

  // }
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

export default StudentWordsTestPage;
