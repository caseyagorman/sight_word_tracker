import React from "react";

class StudentWordsTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: this.props.words, showing: true };
    console.log("hello", this.state.words);
  }

  render() {
    // const { showing } = this.state;
    return (
      <div>
        <div />
        Add New Student Word
        <br />
        Word:
        {/* <button onClick={() => this.setState({ showing: !showing })}>
          toggle
        </button>
        {showing ? <div>This is visible</div> : null} */}
      </div>
    );
  }
}

export default StudentWordsTestPage;
