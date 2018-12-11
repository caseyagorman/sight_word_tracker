import React from "react";
import axios from "axios";
import Word from "./Word";
import ViewWordsPresentation from "./ViewWordsPresentation";
import WordBarChart from "./WordBarChart";
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
    let wordList = words[0];
    return wordList.map(word => Word(word));
  }

  displayChart(words) {
    if (!words) {
      return <p>loading...</p>;
    }
    console.log(words[1]);
    return <WordBarChart data={words[1]} />;
  }

  render() {
    return (
      <div>
        <div>
          <ViewWordsPresentation
            style={this.divStyle}
            words={this.displayWords(this.state.words)}
          />
        </div>
        {this.displayChart(this.state.words)}
      </div>
    );
  }
}

export default ViewWordsFunctional;
