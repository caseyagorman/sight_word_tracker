import React, { Component } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { withRouter } from "react-router";

class DeleteStudent extends Component {
  constructor(props) {
    super(props);
    this.state = { fname: null, lname: null };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({ fname: this.props.fname, lname: this.props.lname });
  }
  getOptions() {
    if (this.props.fname === undefined) {
    } else {
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
    let deleteStudent = {
      fname: this.props.fname,
      lname: this.props.lname
    };

    deleteStudent = JSON.stringify(deleteStudent);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    axios
      .post("http://localhost:5000/api/delete-student", deleteStudent, config)
      .then(() => {
        this.props.history.push("/students");
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
const DeleteStudentWrapped = withRouter(DeleteStudent);
export default DeleteStudentWrapped;
