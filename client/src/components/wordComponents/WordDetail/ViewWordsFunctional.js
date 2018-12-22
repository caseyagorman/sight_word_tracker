import React from "react";
import Word from "./Word";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordsActions from "../../../redux/actions/wordsActions";
import * as authActions from "../../../redux/actions/authActions";
import ViewWordsPresentation from "./ViewWordsPresentation";
import WordBarChart from "./WordBarChart";

class ViewWordsFunctional extends React.Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      return this.props.history.push("/login");
    } else {
      this.props.wordsActions.fetchWords(this.props.userId);
    }
  }

  displayWords(words) {
    if (!words) {
      return <p>Loading words...</p>;
    }
    let wordsList = words.words[0];
    return wordsList.map(word => Word(word));
  }

  displayChart(words) {
    if (!words) {
      return <p>loading...</p>;
    }
    console.log(words);
    return <WordBarChart data={words[1]} word_id={words[0]} />;
  }

  render() {
    return (
      <div>
        <div>
          <ViewWordsPresentation words={this.props.words[0]} />
        </div>
        <div>{this.displayWords(this.props.words)}</div>
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
)(ViewWordsFunctional);
