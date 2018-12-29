import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";
import { Glyphicon } from "react-bootstrap";

const glyphStyle = {
  fontSize: "40px"
};
class DeleteStudent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getOptions(student) {
    if (!student) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <form>
          <h3>
            <Glyphicon
              style={glyphStyle}
              glyph="glyphicon glyphicon-trash"
              onClick={this.submit}
            />
            <span> </span>
            Delete {student[0].fname}
          </h3>
        </form>
      </div>
    );
  }

  handleSubmit() {
    const user = this.props.token;
    const student = this.props.student[0].student_id;
    this.props.studentActions.deleteStudent(student, user);
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
      <div className="container">{this.getOptions(this.props.student)}</div>
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
