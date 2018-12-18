import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../../redux/actions/userActions";
class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "", password: "", confirmPassword: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    console.log(newUser);

    this.props.userActions.addUser(newUser);
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
// RegisterUser.contextTypes = {
//   context: PropTypes.object.isRequired
// };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterUser);
