import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../../redux/actions/authActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updateInput(key, value) {
    sessionStorage.setItem(key, value);
    this.props.history.push("/");
  }

  handleLogin() {
    if (this.props.auth.loginErrors.error) {
      alert(this.props.auth.loginErrors.error);
      this.props.history.push("/register/");
    }
    if (!this.props.auth.isAuthenticated) {
      return <div />;
    }
    if (this.props.auth.isAuthenticated) {
      this.updateInput("userId", this.props.auth.user.userId);
      this.updateInput("username", this.props.auth.user.username);
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.authActions.loginUser(user);
  }
  handleGetUser() {
    if (!this.props.auth) {
    }
    if (this.props.auth) {
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="form-group" />
        <form onSubmit={this.handleSubmit}>
          <label className="control-label">Username</label>
          <input
            className="form-control"
            name="username"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />

          <label>Password</label>
          <input
            className="form-control"
            name="password"
            type="password"
            value={this.state.value}
            onChange={this.handleChange}
          />

          <div>
            <br />
          </div>
          <button className="btn btn-primary btn-lg">Register</button>
        </form>
        <div>{this.handleGetUser()}</div>
        <div>{this.handleLogin()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
