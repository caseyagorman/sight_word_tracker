import React, { Component } from "react";
import ViewWordsFunctional from "../components/wordComponents/WordDetail/ViewWordsFunctional";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../redux/actions/authActions";
class Words extends Component {
  componentDidMount() {
    console.log("Words container");
    if (sessionStorage.length > 0) {
      this.props.authActions.setUser(sessionStorage);
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
        <ViewWordsFunctional
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
