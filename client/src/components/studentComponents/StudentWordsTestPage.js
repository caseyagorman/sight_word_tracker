import React from "react";

class StudentWordsTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: this.props.words, idx: 0 };
  }

  displayWord(words) {
    if (!words) {
      return <div>loading...</div>;
    }
    return <div>{words}</div>;
  }

  incrementIdx(idx) {
    let new_idx = idx + 1;
    this.setState({ idx: new_idx });
    console.log("yes!");
  }

  stub(e, word) {
    e.preventDefault();
    console.log(word, e.target.value);
  }
  render() {
    const words = this.state.words;
    const idx = this.state.idx;
    return (
      <div>
        <div>{this.displayWord(words[idx])}</div>
        <button onClick={e => this.stub(e, words[idx])} value="yes">
          Yes
        </button>
        <button onClick={e => this.stub(e, words[idx])} value="no">
          No
        </button>
        <br />
        <div>
          <br />
          <button onClick={() => this.incrementIdx(idx)}>Next</button>
        </div>
      </div>
    );
  }
}

export default StudentWordsTestPage;
