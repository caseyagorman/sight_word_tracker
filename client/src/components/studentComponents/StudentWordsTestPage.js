import React from "react";

class StudentWordsTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: this.props.words, showing: true };
  }
  displayTest(word) {
    if (!word) {
      return <div>loading...</div>;
    }
    console.log(word);
    const showing = word.showing;
    return (
      <div>
        {showing ? <div>{word}</div> : null}
        <button onClick={() => this.setState({ showing: !showing })}>
          toggle
        </button>
      </div>
    );
  }
  render() {
    const words = this.state.words;
    return words.map(word => this.displayTest(word));

    // return <div> {this.state.words.map(word => this.DisplayTest(word))} </div>;
  }
}

export default StudentWordsTestPage;
