import React from "react";
import DisplayWord from "./DisplayWord";

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

  render() {
    const words = this.state.words;
    const idx = this.state.idx;
    return (
      <div>
        <div>{this.displayWord(words[idx])}</div>
        <button onClick={() => this.incrementIdx(idx)} />
      </div>
    );
    {
      /* <button onClick={(idx += 1)} /> */
    }
  }
}

export default StudentWordsTestPage;
