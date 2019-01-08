import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as letterTestActions from "../../../redux/actions/letterTestActions";
import { Row } from "reactstrap";
import "../../../static/TestStyle.css";

class StudentLetterTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: this.props.letters,
      idx: 0,
      known_letters: [],
      unknown_letters: []
    };
  }

  displayLetter(letters) {
    if (!letters) {
      this.createTestObject();
    }

    return <div>{letters}</div>;
  }
  async createTestObject() {
    let results = {
      student: this.props.student[0].student_id,
      correct_letters: this.state.known_letters,
      incorrect_letters: this.state.unknown_letters
    };
    const user = this.props.user;
    this.props.letterTestActions.addLetterTest(results, user);
  }

  incrementIdx(idx) {
    let new_idx = idx + 1;
    this.setState({ idx: new_idx });
  }

  handleTestClick(e, letter, idx) {
    e.preventDefault();
    this.incrementIdx(idx);
    if (e.target.value === "yes") {
      this.setState({
        known_letters: this.state.known_letters.concat([letter])
      });
    } else if (e.target.value === "no") {
      this.setState({
        unknown_letters: this.state.unknown_letters.concat([letter])
      });
    }
  }

  render() {
    const letters = this.state.letters;
    const idx = this.state.idx;
    return (
      <div className="container">
        <div className="display-test-letter">
          {this.displayLetter(letters[idx])}
        </div>
        <Row className="text-center">
          <button
            id="yes-button"
            onClick={e => this.handleTestClick(e, letters[idx], idx)}
            value="yes"
          >
            Yes
          </button>
          <button
            id="no-button"
            onClick={e => this.handleTestClick(e, letters[idx], idx)}
            value="no"
          >
            No
          </button>
        </Row>
      </div>
    );
  }
}

const StudentLetterTestPageWrapped = withRouter(StudentLetterTestPage);

function mapStateToProps(state) {
  return {
    letterTest: state.letterTest
  };
}

function mapDispatchToProps(dispatch) {
  return {
    letterTestActions: bindActionCreators(letterTestActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentLetterTestPageWrapped);
