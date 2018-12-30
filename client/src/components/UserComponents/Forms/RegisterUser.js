import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as registrationActions from "../../../redux/actions/registrationActions";
import * as authActions from "../../../redux/actions/authActions";
class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "", password: "", confirmPassword: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.authActions.clearErrors();
  }

  handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    let newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    this.props.registrationActions.registerUser(newUser);
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
          ß<label>email</label>
          <input
            className="form-control"
            name="email"
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
          <label>Confirm password</label>
          <input
            className="form-control"
            name="confirmPassword"
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
function mapDispatchToProps(dispatch) {
  return {
    registrationActions: bindActionCreators(registrationActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    user: state.user,
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterUser);
