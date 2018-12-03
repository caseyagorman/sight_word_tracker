import React, { Component } from "react";
import axios from "axios";
import GetWordOptions from "./GetWordOptions";

class AddStudentWordForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
    this.addStudentWord = this.addStudentWord.bind(this);
  }

  async addStudentWord(event) {
    event.preventDefault();

    const options = event.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ value: value });
    let newStudentWord = {
      fname: this.props.fname,
      lname: this.props.lname,
      words: this.wordInput.value
    };

    newStudentWord = JSON.stringify(newStudentWord);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    try {
      let d = await axios.post(
        "http://localhost:5000/api/add-word-to-student",
        newStudentWord,
        config
      );

      console.log(d);
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <div>
        <form>
          <label>
            <GetWordOptions />
          </label>
        </form>
      </div>
    );
  }
}

export default AddStudentWordForm;
