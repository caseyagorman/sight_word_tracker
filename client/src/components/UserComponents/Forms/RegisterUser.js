import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../../redux/actions/userActions";
class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = { first_name: "", last_name: "", email: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };

    this.props.userActions.addUser(newUser);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="form-group" />
        <form onSubmit={this.handleSubmit}>
          <div className="form-control">
            <label className="control-label">First name</label>
            <input
              name="first_name"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-control">
            <label>Last name</label>
            <input
              name="last_name"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-control">
            <label>email</label>
            <input
              name="email"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>

          <button>Register</button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterUser);
