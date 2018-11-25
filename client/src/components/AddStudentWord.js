import React, { Component } from "react";
import axios from "axios";

class AddStudentWord extends Component {
  constructor(props) {
    super(props);
    this.addStudentWord = this.addStudentWord.bind(this);
  }

  addStudentWord(event) {
    event.preventDefault();
    let newStudentWord = {
      fname: this.fnameInput.value,
      lname: this.lnameInput.value,
      word: this.wordInput.value
    };

    newStudentWord = JSON.stringify(newStudentWord);
    console.log(newStudentWord);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    axios
      .post(
        "http://localhost:5000/api/add-word-to-student",
        newStudentWord,
        config
      )
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
        <h2>Add student word</h2>
        <form onSubmit={this.addStudentWord}>
          Add New Student Word
          <br />
          <label>
            First Name:
            <input
              id="nameForm"
              type="text"
              ref={fnameInput => (this.fnameInput = fnameInput)}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input ref={lnameInput => (this.lnameInput = lnameInput)} />
          </label>
          <br />
          <label>
            Word:
            <input ref={wordInput => (this.wordInput = wordInput)} />
          </label>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AddStudentWord;
