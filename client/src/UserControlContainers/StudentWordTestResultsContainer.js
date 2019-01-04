import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../redux/actions/authActions";
import StudentWordTestResults from "../components/StudentWordTestResultsComponents/StudentWordTestResults";
class StudentWordTestResultsContainer extends Component {
  componentDidMount() {
    if (sessionStorage.token) {
      this.props.authActions.checkUser(sessionStorage);
    } else {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }

  displayStudentWordTestResults() {
    if (!this.props.auth.isAuthenticated) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <StudentWordTestResults
          token={this.props.token}
          username={this.props.username}
          id={this.props.id}
        />
      </div>
    );
  }

  render() {
    return <div>{this.displayStudentWordTestResults()}</div>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentWordTestResultsContainer);
