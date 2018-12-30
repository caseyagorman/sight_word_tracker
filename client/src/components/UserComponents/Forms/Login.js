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
  componentWillReceiveProps(newProps) {
    if (newProps.auth.loginErrors === "") {
    }

    if (newProps.auth.isAuthenticated) {
      this.updateInput("token", newProps.auth.user.token);
      this.updateInput("username", newProps.auth.user.username);
      this.props.history.push("/");
    } else if (newProps.auth.loginErrors.error) {
      alert(newProps.auth.loginErrors.error);
      newProps.history.push("/register/");
    }
  }

  updateInput(key, value) {
    sessionStorage.setItem(key, value);
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.authActions.loginUser(user);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="container">
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
          <button className="btn btn-primary btn-lg">Login</button>
        </form>
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
