import React, { Component } from "react";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Welcome</h2>
        <div>
          <label>
            <input
              onChange={this.onChange}
              type="text"
              name="username"
              value={this.state.username}
            />
          </label>
        </div>
        <div>
          <button>Signup</button>
        </div>
      </form>
    );
  }
}
