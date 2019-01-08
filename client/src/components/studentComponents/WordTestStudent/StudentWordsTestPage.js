import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordTestActions from "../../../redux/actions/wordTestActions";
import { Row } from "reactstrap";
import "../../../static/TestStyle.css";

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
      student: this.props.student[0].student_id,
      correct_words: this.state.known_words,
      incorrect_words: this.state.unknown_words
    };
    const user = this.props.user;
    this.props.wordTestActions.addWordTest(results, user);
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
      <div className="container">
        <div className="display-test-item">{this.displayWord(words[idx])}</div>
        <Row className="text-center">
          <button
            id="yes-button"
            onClick={e => this.handleTestClick(e, words[idx], idx)}
            value="yes"
          >
            Yes
          </button>
          <button
            id="no-button"
            onClick={e => this.handleTestClick(e, words[idx], idx)}
            value="no"
          >
            No
          </button>
        </Row>
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
    wordTestActions: bindActionCreators(wordTestActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentWordsTestPageWrapped);
