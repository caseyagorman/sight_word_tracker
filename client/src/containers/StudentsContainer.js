import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../redux/actions/authActions";
import ViewStudents from "../components/StudentComponents/ViewStudents";
class StudentsContainer extends Component {
  componentDidMount() {
    if (sessionStorage.length > 0) {
      this.props.authActions.checkUser(sessionStorage);
    } else {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }

  displayStudents() {
    if (!this.props.auth.isAuthenticated) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <ViewStudents
          userId={this.props.auth.user.userId}
          username={this.props.auth.user.username}
          id={this.props.match.params.id}
        />
      </div>
    );
  }

  render() {
    return <div>{this.displayStudents()}</div>;
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
)(StudentsContainer);
