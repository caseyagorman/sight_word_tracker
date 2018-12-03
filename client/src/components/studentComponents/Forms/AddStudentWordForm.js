import React, { Component } from "react";
import axios from "axios";

class AddStudentWordForm extends Component {
  constructor(props) {
    super(props);
    this.addStudentWord = this.addStudentWord.bind(this);
    console.log(props.fname, props.lname);
  }

  addStudentWord(event) {
    event.preventDefault();
    console.log(this.props.fname, this.props.lname);
    let newStudentWord = {
      fname: this.props.fname,
      lname: this.props.lname,
      words: this.wordInput.value
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
    console.log(newStudentWord);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.addStudentWord}>
          Add New Student Word
          <br />
          Word:
          <input ref={wordInput => (this.wordInput = wordInput)} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AddStudentWordForm;
