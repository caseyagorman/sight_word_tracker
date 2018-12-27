import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../redux/actions/authActions";
import StudentDetail from "../components/StudentComponents/StudentDetail/StudentDetail";
class StudentDetailContainer extends Component {
  componentDidMount() {
    console.log("detail container", this.props);
    console.log("student id is", this.props.match.params.id);
    console.log(typeof this.props.match.params.id);
    this.studentId = this.props.match.params.id;
    if (sessionStorage.length > 0) {
      this.props.authActions.checkUser(sessionStorage);
    } else {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }

  displayStudent() {
    console.log("displaying student", this.props.match.params.id);
    if (!this.props.auth.user.token) {
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
