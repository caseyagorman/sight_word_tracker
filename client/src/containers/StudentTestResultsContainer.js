import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../redux/actions/authActions";
import StudentTestResults from "../components/StudentTestResultsComponents/StudentTestResults";
class StudentTestResultsContainer extends Component {
  componentDidMount() {
    console.log(this.props, "studentest results container");
    if (sessionStorage.length > 0) {
      this.props.authActions.checkUser(sessionStorage);
    } else {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }

  displayStudentTestResults() {
    if (!this.props.auth.isAuthenticated) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <StudentTestResults
          token={this.props.token}
          username={this.props.username}
          id={this.props.id}
        />
      </div>
    );
  }

  render() {
    return <div>{this.displayStudentTestResults()}</div>;
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
)(StudentTestResultsContainer);
