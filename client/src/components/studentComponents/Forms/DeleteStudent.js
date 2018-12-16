import React, { Component } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";
class DeleteStudent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getOptions() {
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

  handleSubmit() {
    let deleteStudent = {
      fname: this.props.student[0].fname,
      lname: this.props.student[0].lname
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
const DeleteStudentWrapped = withRouter(DeleteStudent);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteStudentWrapped);
