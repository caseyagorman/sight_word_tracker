import React, { Component } from "react";
import axios from "axios";

class DeleteWord extends Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log(this.props.word);
    this.setState({ value: this.props.word });
    console.log(this.state);
  }
  getOptions() {
    if (this.props.word.key == undefined) {
      console.log("yo!", this.state.value);
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <button type="submit"> Delete?</button>
            </label>
          </form>
        </div>
      );
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let deleteWord = {
      word: this.props.word
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
        <div>{this.getOptions()}</div>
      </div>
    );
  }
}

export default DeleteWord;
