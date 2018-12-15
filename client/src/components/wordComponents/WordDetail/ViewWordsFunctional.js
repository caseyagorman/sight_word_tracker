import React from "react";
import Word from "./Word";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordActions from "../../../redux/actions/wordActions";
import ViewWordsPresentation from "./ViewWordsPresentation";
import WordBarChart from "./WordBarChart";

class ViewWordsFunctional extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.wordActions.fetchWords();
  }
  displayWords(words) {
    if (!words) {
      return <p>Loading words...</p>;
    }
    let wordList = words[0];
    console.log(wordList);
    return wordList.map(word => Word(word));
  }

  displayChart(words) {
    if (!words) {
      return <p>loading...</p>;
    }
    console.log(words[1]);
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

ViewWordsFunctional.propTypes = {
  wordActions: PropTypes.object,
  words: PropTypes.object
};

function mapStateToProps(state) {
  return {
    words: state.words
  };
}

function mapDispatchToProps(dispatch) {
  return {
    wordActions: bindActionCreators(wordActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewWordsFunctional);
