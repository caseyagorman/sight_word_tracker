import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordsActions from "../../../redux/actions/wordsActions";
import * as authActions from "../../../redux/actions/authActions";
import AddWordButton from "../Forms/AddWordButton";
import ViewChartsButton from "../Forms/ViewChartsButton";
import Line1 from "./Line1AllWords";
import "../../../static/WordStyle.css";

class ViewWords extends React.Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    } else if (this.props.auth.isAuthenticated) {
      const user = this.props.token;
      this.props.wordsActions.fetchWords(user);
    }
  }

  displayInstructions() {
    return <div>Click word to view students learning each word.</div>;
  }
  displayLine1(words) {
    if (!words) {
      return <p>loading...</p>;
    }
    return <Line1 words={words} />;
  }
  displayAddWordButton() {
    return <AddWordButton />;
  }
  displayViewChartsButton() {
    return <ViewChartsButton />;
  }

  render() {
    return (
      <div className="container">
        <br />
        <h1 id="display-word">All Words</h1>
        <br />
        <div id="instructions">{this.displayInstructions()}</div>
        <br />
        <div>
          {this.displayAddWordButton()}
          {this.displayViewChartsButton()}
        </div>
        <br />
        <div>{this.displayLine1(this.props.words)}</div>
        <br />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    words: state.words,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    wordsActions: bindActionCreators(wordsActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewWords);
