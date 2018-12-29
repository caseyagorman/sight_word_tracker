import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordsActions from "../../../redux/actions/wordsActions";
import * as authActions from "../../../redux/actions/authActions";
import WordBarChart from "./WordBarChart";
import AddWordButton from "../Forms/AddWordButton";
import Line1 from "./Line1AllWords";
const headerStyle = {
  fontSize: "100px"
};
class ViewWords extends React.Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      const user = this.props.token;
      this.props.wordsActions.fetchWords(user);
    }
  }

  displayChart(words) {
    if (!words) {
      return <p>loading...</p>;
    }
    return <WordBarChart data={words} />;
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

  render() {
    return (
      <div class="container">
        <br />
        <h1 style={headerStyle}>All Words</h1>
        <div>{this.displayAddWordButton()}</div>
        <br />
        <div>{this.displayLine1(this.props.words)}</div>
        {this.displayChart(this.props.words)}
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
