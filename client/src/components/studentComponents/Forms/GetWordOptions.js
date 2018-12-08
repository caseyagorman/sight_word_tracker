import React from "react";
import axios from "axios";
import DisplayWordOptions from "./DisplayWordOptions";

const apiUrl = "http://localhost:5000/api/words";

class GetWordOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: null };
    axios.get(apiUrl).then(response => {
      this.setState({
        words: response.data
      });
    });
  }

  turnIntoArray(obj) {
    if (!obj) {
      return <p>Loading...</p>;
    }
    let wordList = [];
    for (let key in obj) {
      let wordObj = obj[key];
      wordList.push(wordObj.word);
    }
    return wordList;
  }
  getOptions(words) {
    if (!words) {
      return <p>Loading...</p>;
    }
    let wordList = this.turnIntoArray(words);
    return (
      <label>
        <select className="select-board-size">
          {wordList.map(word => (
            <option key={word} value={word}>
              {word}
            </option>
          ))}
        </select>
      </label>
    );
  }

  render() {
    return <div>{this.getOptions(this.state.words)}</div>;
  }
}

export default GetWordOptions;
