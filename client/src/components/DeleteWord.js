import React, { Component } from "react";
import axios from "axios";

class DeleteWord extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteWord = this.handleDeleteWord.bind(this);
  }

  handleDeleteWord(event) {
    event.preventDefault();
    let deleteWord = {
      word: this.wordInput.value
    };

    deleteWord = JSON.stringify(deleteWord);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    console.log(deleteWord);
    axios
      .post("http://localhost:5000/api/delete-word", deleteWord, config)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <h2>Delete Word</h2>
        <form onSubmit={this.handleDeleteWord}>
          <br />
          <label>
            Word:
            <input
              id="wordForm"
              type="text"
              ref={wordInput => (this.wordInput = wordInput)}
            />
          </label>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default DeleteWord;
