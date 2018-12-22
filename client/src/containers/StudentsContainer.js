import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../redux/actions/authActions";
import ViewStudents from "../components/studentComponents/ViewStudents";
class Students extends Component {
  componentDidMount() {
    if (sessionStorage.length > 0) {
      this.props.authActions.setUser(sessionStorage);
    } else {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <div>
        <ViewStudents
          userId={this.props.auth.user.userId}
          username={this.props.auth.user.username}
        />
      </div>
    );
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
)(Students);
