import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as letterTestActions from "../../../redux/actions/letterTestActions";
import * as studentTestActions from "../../../redux/actions/studentTestActions";
import { Row } from "reactstrap";
import "../../../static/TestStyle.css";

class StudentLetterTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: this.props.letters,
      idx: 0
    };
  }

  displayLetter(letters) {
    if (!letters) {
      return <div className="test-complete-message">test complete</div>;
    }

    return <div className="display-test-letter">{letters}</div>;
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

  endTest(e) {
    e.preventDefault();

    this.props.studentTestActions.submitStudentTest(
      this.props.studentTest.testItems,
      this.props.studentTest.testType,
      this.props.student[0].student_id,
      this.props.user
    );
  }

  handleTestClick(e, letter, idx) {
    e.preventDefault();
    this.incrementIdx(idx);

    const answeredCorrectly = e.target.value === "yes";
    this.props.studentTestActions.answerQuestion(letter, answeredCorrectly);
  }

  render() {
    const letters = this.state.letters;
    const idx = this.state.idx;
    return (
      <div className="container">
        <div>{this.displayLetter(letters[idx])}</div>
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
        <button onClick={e => this.endTest(e)} id="end-test-button">
          End Test
        </button>
      </div>
    );
  }
}

const StudentLetterTestPageWrapped = withRouter(StudentLetterTestPage);

function mapStateToProps(state) {
  return {
    studentTest: state.studentTest
  };
}

function mapDispatchToProps(dispatch) {
  return {
    letterTestActions: bindActionCreators(letterTestActions, dispatch),
    studentTestActions: bindActionCreators(studentTestActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentLetterTestPageWrapped);
