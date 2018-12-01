import React from "react";

class DisplayWord extends React.Component {
  constructor() {
    super();
    this.state = {
      isHidden: true
    };
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  render() {
    const { word } = this.props;
    return (
      <div>
        <button onClick={() => this.toggleHidden()}>word</button>
        {this.state.isHidden && word}
      </div>
    );
  }
}

export default DisplayWord;
