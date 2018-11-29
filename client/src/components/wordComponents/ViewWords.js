import React from "react";
import axios from "axios";
import Word from "./Word";
import { Link } from "react-router-dom";
const divStyle = {
  display: "inline"
};
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
        <br />
        <h1>Words</h1>
        <div style={divStyle}>
          <Link to={`/add-word`}> Add Word |</Link>
        </div>

        <div style={divStyle}>
          {" "}
          <Link to={`/delete-word`}> Delete Word</Link>
        </div>
        <div>
          <br />
        </div>
        <div>{this.displayWords(this.state.words)}</div>
      </div>
    );
  }
}

export default ViewWords;
