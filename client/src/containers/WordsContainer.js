import React, { Component } from "react";
import ViewWords from "../components/WordComponents/ViewWords";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../redux/actions/authActions";
class Words extends Component {
  componentDidMount() {
    if (sessionStorage.length > 0) {
      this.props.authActions.checkUser(sessionStorage);
    } else {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }

  displayWords() {
    if (!this.props.auth.isAuthenticated) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <ViewWords
          userId={this.props.auth.user.userId}
          username={this.props.auth.user.username}
        />
      </div>
    );
  }

  render() {
    return <div>{this.displayWords()}</div>;
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
)(Words);
