import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../../redux/actions/userActions";
import { Redirect } from "react-router";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let authUser = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.userActions.loginUser(authUser);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Username</label>
        <input
          name="first_name"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <label>Password</label>
        <input
          name="last_name"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />

        <button>SignIn</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.loggIn
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
)(SignIn);
