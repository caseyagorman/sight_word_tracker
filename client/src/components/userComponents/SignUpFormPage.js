import React, { Component } from "react";
import SignUpForm from "./SignUpForm";
import { connect } from "react-redux";
import { userSignupRequest } from "../../actions/signupActions";
class SignUpFormPage extends Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div>
        <div>
          <SignUpForm userSignupRequest={userSignupRequest} />
        </div>
      </div>
    );
  }
}
SignUpFormPage.propTypes = {
  userSignupRequest: React.propTypes.func.isRequired
};

export default connect(state => {
  return { userSignupRequest };
})(SignUpFormPage);
