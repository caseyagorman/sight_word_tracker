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
    console.log(this.props.fname);
    this.setState({ fname: this.props.fname, lname: this.props.lname });
    console.log(this.state);
  }
  getOptions() {
    console.log(this.props.fname);
    if (this.props.fname === undefined) {
      console.log(this.state.fname);
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
    console.log(deleteStudent);

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
