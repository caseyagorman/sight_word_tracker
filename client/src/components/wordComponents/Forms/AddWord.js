import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordActions from "../../../redux/actions/wordActions";
import * as authActions from "../../../redux/actions/authActions";

class AddWord extends Component {
  constructor(props) {
    super(props);
    this.state = { newWord: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log("add word", this.props);
    // if (sessionStorage.length > 0) {
    //   this.props.authActions.checkUser(sessionStorage);
    // } else {
    //   alert("Please log in");
    //   this.props.history.push("/login");
    // }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.word) {
      this.props.history.push("/words");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const userId = this.props.userId;
    let newWord = {
      word: this.state.newWord,
      user_id: userId
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
    word: state.word,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    wordActions: bindActionCreators(wordActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddWord);
