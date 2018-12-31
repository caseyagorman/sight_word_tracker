import React, { Component } from "react";
import RegisterUser from "./Forms/RegisterUser";
class RegisterPage extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <RegisterUser props={this.props} />
        </div>
      </div>
    );
  }
}

export default RegisterPage;
