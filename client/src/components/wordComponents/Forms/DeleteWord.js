import React, { Component } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { withRouter } from "react-router";

class DeleteWord extends Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({ value: this.props.word });
  }
  getOptions() {
    if (this.props.word.key === undefined) {
      return (
        <div>
          <form>
            <label>
              <button onClick={this.submit}>Delete</button>
            </label>
          </form>
        </div>
      );
    }
  }

  handleSubmit() {
    let deleteWord = {
      word: this.props.word.word
    };

    deleteWord = JSON.stringify(deleteWord);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    axios
      .post("http://localhost:5000/api/delete-word", deleteWord, config)
      .then(() => {
        this.props.history.push("/words");
      })
      .catch(err => {
        console.log(err);
      });
  }
  submit = event => {
    event.preventDefault();
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: event => this.handleSubmit()
        },
        {
          label: "No",
          onClick: () => console.log("no")
        }
      ]
    });
  };

  render() {
    return (
      <div>
        <div>{this.getOptions()}</div>
      </div>
    );
  }
}
const DeleteWordWrapped = withRouter(DeleteWord);
export default DeleteWordWrapped;
