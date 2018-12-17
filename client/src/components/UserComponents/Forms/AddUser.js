import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../../redux/actions/userActions";
class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = { fname: "", lname: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newUser = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.classroom
    };

    this.props.studentActions.addUser(newUser);
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
        <label>email</label>
        <input
          name="lname"
          type="email"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={this.state.value}
          onChange={this.handleChange}
        />

        <button>Register</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser);
