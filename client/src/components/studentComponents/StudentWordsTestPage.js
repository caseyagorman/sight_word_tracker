import React from "react";

class StudentWordsTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: this.props.words, showing: true };
  }

  render() {
    const showing = this.state.showing;
    return (
      <div>
        <div>
          {showing ? <div>{this.state.words[0]}</div> : null}
          <button onClick={() => this.setState({ showing: !showing })}>
            Yes
          </button>
        </div>
        <div>
          {showing ? <div>{this.state.words[1]}</div> : null}
          <button onClick={() => this.setState({ showing: !showing })}>
            toggle
          </button>
        </div>
      </div>
    );
  }
}

export default StudentWordsTestPage;
