import React from "react";
import axios from "axios";
import Word from "./Word";
import ViewWordsPresentation from "./ViewWordsPresentation";
const divStyle = {
  display: "inline"
};
const apiUrl = "http://localhost:5000/api/words";

class ViewWordsFunctional extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: null };
    axios.get(apiUrl).then(response => {
      this.setState({
        words: response.data
      });
    });
  }

  displayWords(words) {
    if (!words) {
      return <p>Loading words...</p>;
    }
    return words.map(word => Word(word));
  }

  render() {
    return (
      <div>
        <ViewWordsPresentation
          style={this.divStyle}
          words={this.displayWords(this.state.words)}
        />
      </div>
    );
  }
}

export default ViewWordsFunctional;
