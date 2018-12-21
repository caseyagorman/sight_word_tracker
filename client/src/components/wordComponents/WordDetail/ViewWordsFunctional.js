import React from "react";
import Word from "./Word";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordsActions from "../../../redux/actions/wordsActions";
import ViewWordsPresentation from "./ViewWordsPresentation";
import WordBarChart from "./WordBarChart";

class ViewWordsFunctional extends React.Component {
  componentDidMount() {
    const user = this.props.auth.user.user_id;
    this.props.wordsActions.fetchWords(user);
  }
  displayWords(words) {
    if (!words) {
      return <p>Loading words...</p>;
    }
    let wordList = words[0];
    return wordList.map(word => Word(word));
  }

  displayChart(words) {
    if (!words) {
      return <p>loading...</p>;
    }
    return <WordBarChart data={words[1]} word_id={words[0]} />;
  }

  render() {
    return (
      <div>
        <div>
          <ViewWordsPresentation
            style={this.divStyle}
            words={this.displayWords(this.props.words)}
          />
        </div>
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
    wordsActions: bindActionCreators(wordsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewWordsFunctional);
