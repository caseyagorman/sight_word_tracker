import React, { Component } from "react";

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={event => this.onChange(event)}
          />
        </div>
        <div>
          <button>Sign up</button>
        </div>
      </form>
    );
  }
}

export default SignUpPage;
