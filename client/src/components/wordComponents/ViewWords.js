import React from "react";
import axios from "axios";
import Word from "./Word";
const apiUrl = "http://localhost:5000/api/words";

class ViewWords extends React.Component {
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
        <h2>Words</h2>
        {this.displayWords(this.state.words)}
      </div>
    );
  }
}

export default ViewWords;
