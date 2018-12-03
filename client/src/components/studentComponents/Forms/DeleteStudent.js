import React, { Component } from "react";
import axios from "axios";

class DeleteStudent extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteStudent = this.handleDeleteStudent.bind(this);
  }

  async handleDeleteStudent(event) {
    event.preventDefault();
    let deleteStudent = {
      fname: this.fnameInput.value
    };

    deleteStudent = JSON.stringify(deleteStudent);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    try {
      let d = await axios.post(
        "http://localhost:5000/api/delete-student",
        deleteStudent,
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
        <form onSubmit={this.handleDeleteStudent}>
          Delete Student
          <br />
          <label>
            First Name:
            <input
              id="nameForm"
              type="text"
              ref={fnameInput => (this.fnameInput = fnameInput)}
            />
          </label>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default DeleteStudent;
