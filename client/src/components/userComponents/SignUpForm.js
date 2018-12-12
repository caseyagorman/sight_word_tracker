import React, { Component } from "react";

class SignUpPage extends Component {
  render() {
    return (
      <form>
        <div>
          <label>Username</label>
          <input type="text" name="username" />
        </div>
        <div>
          <button>Sign up</button>
        </div>
      </form>
    );
  }
}

export default SignUpPage;
