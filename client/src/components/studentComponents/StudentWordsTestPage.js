import React from "react";
import DisplayWord from "./DisplayWord";

class StudentWordsTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: this.props.words };
  }

  render() {
    const words = this.props.words;
    return words.map(word => <DisplayWord word={word} />);
  }
}

export default StudentWordsTestPage;
