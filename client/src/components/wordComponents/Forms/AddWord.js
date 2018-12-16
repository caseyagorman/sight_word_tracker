import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordActions from "../../../redux/actions/wordActions";

class AddWord extends Component {
  constructor(props) {
    super(props);
    this.state = { newWord: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newWord = {
      word: this.state.newWord
    };

    this.props.wordActions.addWord(newWord);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>You may add multiple words separated by space</p>
        Add New Words:
        <input
          name="newWord"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button>Add Word</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    word: state.word
  };
}

function mapDispatchToProps(dispatch) {
  return {
    wordActions: bindActionCreators(wordActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddWord);
