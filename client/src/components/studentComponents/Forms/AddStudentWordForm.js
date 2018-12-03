import React, { Component } from "react";
import axios from "axios";
const apiUrl = "http://localhost:5000/api/words";

class AddStudentWordForm extends Component {
  constructor(props) {
    super(props);
    this.state = { words: null, selected: "" };
    this.addStudentWord = this.addStudentWord.bind(this);
    this.handleChange = this.handleChange.bind(this);
    axios.get(apiUrl).then(response => {
      this.setState({
        words: response.data
      });
    });
  }
  handleChange(e) {
    this.setState({ selected: e.target.value });
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
      <div>
        <form onSubmit={this.addStudentWord}>
          <label>
            <select onChange={this.handleChange}>
              {wordList.map(word => (
                <option key={word}>{word}</option>
              ))}
            </select>
          </label>
          <button type="submit"> Submit</button>
        </form>
      </div>
    );
  }
  async addStudentWord(event) {
    event.preventDefault();
    console.log("click");
    console.log("this", this);
    console.log(this.state.selected);

    // // const options = event.target.options;
    // // let value = [];
    // // for (let i = 0, l = options.length; i < l; i++) {
    // //   if (options[i].selected) {
    // //     value.push(options[i].value);
    // //   }
    // // }
    // // this.setState({ value: value });

    let newStudentWord = {
      fname: this.props.fname,
      lname: this.props.lname,
      words: this.state.selected
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
    return <div>{this.getOptions(this.state.words)}</div>;
  }
}

export default AddStudentWordForm;
