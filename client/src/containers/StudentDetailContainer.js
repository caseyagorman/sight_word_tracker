import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../redux/actions/authActions";
import StudentDetail from "../components/StudentComponents/StudentDetail/StudentDetail";
class StudentDetailContainer extends Component {
  componentDidMount() {
    this.studentId = this.props.match.params.id;
    if (sessionStorage.length > 0) {
      this.props.authActions.checkUser(sessionStorage);
    } else {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }

  displayStudent() {
    if (!this.studentId) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <StudentDetail
          token={this.props.auth.user.token}
          username={this.props.auth.user.username}
          id={this.studentId}
        />
      </div>
    );
  }

  render() {
    return <div>{this.displayStudent()}</div>;
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
)(StudentDetailContainer);
