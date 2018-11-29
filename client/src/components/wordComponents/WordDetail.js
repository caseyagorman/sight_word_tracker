import React from "react";
import axios from "axios";
import WordStudentsPage from "./WordStudentsPage";
import WordPage from "./WordPage";
class WordDetail extends React.Component {
  state = {
    word: null
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`http://localhost:5000/api/word-detail/${id}`).then(word => {
      this.setState(() => ({ word }));
    });
  }

  displayWord(word) {
    if (!word) {
      return <p>Loading...</p>;
    }
    console.log(word.data[0]);
    return WordPage(word);
  }

  displayWordStudents(word) {
    if (!word) {
      return <p>Loading ...</p>;
    }
    return word.data[1].map(word => WordStudentsPage(word));
  }

  render() {
    return (
      <div>
        <br />
        <div>{this.displayWord(this.state.word)}</div>
        <br />
        <div>{this.displayWordStudents(this.state.word)}</div>
      </div>
    );
  }
}

export default WordDetail;
