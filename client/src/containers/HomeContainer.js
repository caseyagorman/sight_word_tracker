import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../redux/actions/authActions";
import Home from "../components/Home";
class HomeContainer extends Component {
  componentDidMount() {
    if (sessionStorage.length > 0) {
      this.props.authActions.checkUser(sessionStorage);
    } else {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }

  displayHomePage() {
    if (this.props.auth.isAuthenticated === false) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <Home
          userId={this.props.auth.user.userId}
          username={this.props.auth.user.username}
        />
      </div>
    );
  }

  render() {
    return <div>{this.displayHomePage()}</div>;
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
)(HomeContainer);
