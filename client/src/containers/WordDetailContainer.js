import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../redux/actions/authActions";
import WordDetail from "../components/WordComponents/WordDetail/WordDetail";
class WordDetailContainer extends Component {
  componentDidMount() {
    if (sessionStorage.length > 0) {
      this.props.authActions.checkUser(sessionStorage);
    } else {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }

  displayWord() {
    if (!this.props.auth.isAuthenticated) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <WordDetail
          userId={this.props.auth.user.userId}
          username={this.props.auth.user.username}
          id={this.props.match.params.id}
        />
      </div>
    );
  }

  render() {
    return <div>{this.displayWord()}</div>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}
function mapStateToProps(state) {
  return {
    word: state.word,
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordDetailContainer);
