import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.addStudent = this.addStudent.bind(this);
  }

  async addStudent(event) {
    event.preventDefault();
    let newStudent = {
      fname: this.fnameInput.value,
      lname: this.lnameInput.value,
      grade: this.gradeInput.value
    };

    newStudent = JSON.stringify(newStudent);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    try {
      let d = await axios.post(
        "http://localhost:5000/api/add-student",
        newStudent,
        config
      );
      this.props.history.push("/students");
      console.log(d);
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <div>
        <br />
        <h1>Add student</h1>
        <br />
        <form onSubmit={this.addStudent}>
          Add New Student
          <br />
          <label>
            First Name:
            <input
              id="nameForm"
              type="text"
              ref={fnameInput => (this.fnameInput = fnameInput)}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input ref={lnameInput => (this.lnameInput = lnameInput)} />
          </label>
          <br />
          <label>
            Grade:
            <input ref={gradeInput => (this.gradeInput = gradeInput)} />
          </label>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    student: state.student
  };
}

function mapDispatchToProps(dispatch) {
  return {
    studentActions: bindActionCreators(studentActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudent);
