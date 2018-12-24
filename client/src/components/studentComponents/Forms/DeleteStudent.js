import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";
import { Grid, Col, Row, Glyphicon } from "react-bootstrap";
class DeleteStudent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getOptions() {
    return (
      <form>
        <Glyphicon glyph="glyphicon glyphicon-trash" onClick={this.submit} />
      </form>
    );
  }

  handleSubmit() {
    const userId = this.props.userId;
    const studentId = this.props.studentId;
    let deleteStudent = {
      studentId: studentId,
      userId: userId
    };
    this.props.studentActions.deleteStudent(deleteStudent);
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
    student: state.student,
    auth: state.auth
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
