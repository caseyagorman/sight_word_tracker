import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";
import * as authActions from "../../../redux/actions/authActions";

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = { fname: "", lname: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if (sessionStorage.length > 0) {
      this.props.authActions.checkUser(sessionStorage);
    } else {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    let user = this.props.token;
    let newStudent = {
      fname: this.state.fname,
      lname: this.state.lname
    };

    this.props.studentActions.addStudent(newStudent, user);
    this.props.history.push("/students");
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>First name</label>
        <input
          name="fname"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <label>Last name</label>
        <input
          name="lname"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />

        <button>Add student</button>
      </form>
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
    studentActions: bindActionCreators(studentActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudent);
