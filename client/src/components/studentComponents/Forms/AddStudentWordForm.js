import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as unknownWordsActions from "../../../redux/actions/unknownWordsActions";
import axios from "axios";
class AddStudentWordForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  componentDidMount() {
    console.log("props", this.props);
    const id = this.props.student[0].student_id;
    this.props.unknownWordsActions.fetchUnknownWords({
      id: id
    });
    console.log("add student word form props", this.props.unknownWords);
  }

  handleChange(e) {
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

  getOptions() {
    if (!this.props.unknownWords) {
      return <div>Loading!</div>;
    }
    let wordList = this.turnIntoArray(this.props.unknownWords);
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
          <div>
            <br />
            <button type="submit"> Submit</button>
          </div>
        </form>
      </div>
    );
  }

  async handleSubmit(event) {
    event.preventDefault();
    let newStudentWord = {
      fname: this.props[0].fname,
      lname: this.props[0].lname,
      words: this.state.value
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
    return <div>{this.getOptions()}</div>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    unknownWordsActions: bindActionCreators(unknownWordsActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    unknownWords: state.unknownWords
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudentWordForm);
