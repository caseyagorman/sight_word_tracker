import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../../redux/actions/authActions";
import { Redirect } from "react-router";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    console.log("handle submit", user);
    // user = JSON.stringify(user);
    this.props.authActions.loginUser(user);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
    console.log(this.state.username);
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
      </div>
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
    authActions: bindActionCreators(authActions, dispatch)
  };
}
// RegisterUser.contextTypes = {
//   context: PropTypes.object.isRequired
// };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
