import React, { Component } from "react";
import SignupForm from "./SignupForm";

class SignupPage extends Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div>
        <div>
          <SignupForm userSignupRequest={userSignupRequest} />
        </div>
      </div>
    );
  }
}
SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
};
export default connect(
  state => {
    return {};
  },
  { userSignupRequest }
)(SignupPage);
