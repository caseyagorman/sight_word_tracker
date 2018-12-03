import React, { Component } from "react";
import axios from "axios";

class AddStudentWordForm extends Component {
  constructor(props) {
    super(props);
    this.state = { words: null, value: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    console.log("1", this.props);
  }
  componentDidMount() {
    console.log("2", this.props);
    // const { id } = this.props.match.params.student_id;
    axios.get(`http://localhost:5000/api/words/`).then(response => {
      this.setState({
        words: response.data
      });
    });
  }

  handleChange(e) {
    console.log(e.target.options);
    const options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ value: value });
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
    console.log("3", this.props);
    let wordList = this.turnIntoArray(words);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <select
              multiple={true}
              value={this.state.value}
              onChange={this.handleChange}
            >
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

  async handleSubmit(event) {
    event.preventDefault();
    console.log("4", this.props);

    let newStudentWord = {
      fname: this.props.fname,
      lname: this.props.lname,
      words: this.state.value
    };
    console.log(newStudentWord);

    newStudentWord = JSON.stringify(newStudentWord);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/jso n"
      }
    };
    try {
      let d = await axios.post(
        "http://localhost:5000/api/api/add-word-to-student",
        newStudentWord,
        config
      );

      console.log(d);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    console.log("5", this.props);
    return <div>{this.getOptions(this.state.words)}</div>;
  }
}

export default AddStudentWordForm;
