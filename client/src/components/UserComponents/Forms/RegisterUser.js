import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as registrationActions from "../../../redux/actions/registrationActions";
import * as authActions from "../../../redux/actions/authActions";
import { Button, Form, Label, Input } from "reactstrap";
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

  componentWillReceiveProps(newProps) {
    if (!newProps.newUser) {
      return <div />;
    }
    if (newProps.newUser.newUser) {
      this.props.history.push("/login");
    }
    if (newProps.newUser.error) {
      console.log(newProps.newUser.error);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      alert("passwords do not match");
      this.props.authActions.clearErrors();
      event.target.reset();
      return <div />;
    } else {
      event.target.reset();
      let newUser = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      };
      this.props.registrationActions.registerUser(newUser);
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <div className="form-group" />
        <Form onSubmit={this.handleSubmit}>
          <Label className="control-label">Username</Label>
          <Input
            className="form-control"
            name="username"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Label>email</Label>
          <Input
            className="form-control"
            name="email"
            type="email"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Label>Password</Label>
          <Input
            className="form-control"
            name="password"
            type="password"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Label>Confirm password</Label>
          <Input
            className="form-control"
            name="confirmPassword"
            type="password"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <div>
            <br />
          </div>
          <Button className="btn btn-primary btn-lg">Register</Button>
        </Form>
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
