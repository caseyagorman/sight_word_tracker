import React, { Component } from "react";
import axios from "axios";

class AddWord extends Component {
  constructor(props) {
    super(props);
    this.addWord = this.addWord.bind(this);
  }

  addWord(event) {
    event.preventDefault();
    let newWord = {
      word: this.wordInput.value
    };

    newWord = JSON.stringify(newWord);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .post("http://localhost:5000/api/add-word", newWord, config)
      .then(() => {
        this.props.history.push("/words");
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <br />
        <h1>Add Words</h1>
        <br />
        <form onSubmit={this.addWord}>
          <p>You may add multiple words separated by space</p>
          Add New Words:
          <label>
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

export default AddWord;
