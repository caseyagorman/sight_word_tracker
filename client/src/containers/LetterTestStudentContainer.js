import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../redux/actions/authActions";
import LetterTestStudent from "../components/StudentComponents/LetterTestStudent/LetterTestStudent";
class LetterTestStudentContainer extends Component {
  componentDidMount() {
    if (sessionStorage.token) {
      this.props.authActions.checkUser(sessionStorage);
    } else {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }

  displayTestStudent() {
    if (!this.props.auth.isAuthenticated) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <LetterTestStudent
          token={this.props.auth.user.token}
          username={this.props.auth.user.username}
          id={this.props.match.params.id}
        />
      </div>
    );
  }

  render() {
    return <div>{this.displayTestStudent()}</div>;
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
)(LetterTestStudentContainer);
