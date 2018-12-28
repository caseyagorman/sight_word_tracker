import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as testActions from "../../../redux/actions/testActions";

class StudentWordsTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: this.props.words,
      idx: 0,
      known_words: [],
      unknown_words: []
    };
  }

  displayWord(words) {
    if (!words) {
      this.createTestObject();
    }

    return <div>{words}</div>;
  }
  async createTestObject() {
    let results = {
      student: this.props.student,
      correct_words: this.state.known_words,
      incorrect_words: this.state.unknown_words
    };
    const user = this.props.user;
    this.props.testActions.addTest(results, user);
  }

  incrementIdx(idx) {
    let new_idx = idx + 1;
    this.setState({ idx: new_idx });
  }

  handleTestClick(e, word, idx) {
    e.preventDefault();
    this.incrementIdx(idx);
    if (e.target.value === "yes") {
      this.setState({ known_words: this.state.known_words.concat([word]) });
    } else if (e.target.value === "no") {
      this.setState({ unknown_words: this.state.unknown_words.concat([word]) });
    }
  }

  render() {
    const words = this.state.words;
    const idx = this.state.idx;
    return (
      <div>
        <div>{this.displayWord(words[idx])}</div>
        <button
          onClick={e => this.handleTestClick(e, words[idx], idx)}
          value="yes"
        >
          Yes
        </button>
        <button
          onClick={e => this.handleTestClick(e, words[idx], idx)}
          value="no"
        >
          No
        </button>
      </div>
    );
  }
}

const StudentWordsTestPageWrapped = withRouter(StudentWordsTestPage);

function mapStateToProps(state) {
  return {
    test: state.test
  };
}

function mapDispatchToProps(dispatch) {
  return {
    testActions: bindActionCreators(testActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentWordsTestPageWrapped);
