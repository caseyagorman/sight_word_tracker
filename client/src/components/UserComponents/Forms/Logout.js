import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../../redux/actions/authActions";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLogout() {
    if (!this.props.auth.isAuthenticated) {
      sessionStorage.clear();
      this.props.history.push("/login/");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.props.auth.user.userId;
    this.props.authActions.logoutUser(user);
    this.handleLogout();
  }

  render() {
    return (
      <div>
        <div className="form-group" />
        <form onSubmit={this.handleSubmit}>
          <button className="btn btn-danger btn-sm">Logout</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
